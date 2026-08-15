import { createHash, randomBytes, timingSafeEqual } from 'node:crypto'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const REPORT_PRICE = '9.90'
const PRODUCT_NAME = 'SB Index 完整知行对账书'
const TOKEN_PATTERN = /^[a-f0-9]{48}$/

function required(name, source = process.env) {
  const value = source[name]?.trim()
  if (!value) throw new Error(`missing environment variable ${name}`)
  return value
}

export function signValues(values, secret) {
  const content = [...values.entries()]
    .filter(([key, value]) => key !== 'sign' && key !== 'sign_type' && value.trim() !== '')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  return createHash('md5').update(content + secret).digest('hex')
}

export function verifyValues(values, secret) {
  const provided = values.get('sign')?.trim().toLowerCase() ?? ''
  const expected = signValues(values, secret)
  if (provided.length !== expected.length) return false
  return timingSafeEqual(Buffer.from(provided), Buffer.from(expected))
}

function validateReport(report) {
  if (!report || report.version !== 1) throw new Error('报告版本无效')
  if (!Number.isInteger(report.index) || report.index < 0 || report.index > 100) throw new Error('指数无效')
  if (typeof report.personaCode !== 'string' || !/^[A-Z]{3,8}$/.test(report.personaCode)) throw new Error('人格编号无效')
  if (!Array.isArray(report.allGaps) || report.allGaps.length !== 9) throw new Error('完整对账数据无效')
  if (!Array.isArray(report.plan) || report.plan.length !== 4) throw new Error('行动计划数据无效')
  const encoded = JSON.stringify(report)
  if (encoded.length > 64_000) throw new Error('报告数据过大')
  return JSON.parse(encoded)
}

export class OrderStore {
  constructor(filePath) {
    this.filePath = filePath
    this.orders = {}
    this.writeQueue = Promise.resolve()
  }

  async load() {
    await mkdir(path.dirname(this.filePath), { recursive: true, mode: 0o750 })
    try {
      this.orders = JSON.parse(await readFile(this.filePath, 'utf8'))
    } catch (error) {
      if (error.code !== 'ENOENT') throw error
      this.orders = {}
      await this.persist()
    }
  }

  findByToken(token) {
    return this.orders[token]
  }

  findByOrderNo(orderNo) {
    return Object.values(this.orders).find((order) => order.orderNo === orderNo)
  }

  async save(order) {
    this.orders[order.token] = order
    await this.persist()
  }

  async persist() {
    this.writeQueue = this.writeQueue.then(async () => {
      const temporary = `${this.filePath}.tmp`
      await writeFile(temporary, JSON.stringify(this.orders, null, 2), { mode: 0o600 })
      await rename(temporary, this.filePath)
    })
    await this.writeQueue
  }
}

function publicOrder(order, includeReport = false) {
  const result = {
    token: order.token,
    orderNo: order.orderNo,
    platformTradeNo: order.platformTradeNo ?? '',
    status: order.status,
    amount: REPORT_PRICE,
    payUrl: order.payUrl ?? '',
    createdAt: order.createdAt,
    paidAt: order.paidAt,
  }
  if (includeReport && order.status === 'paid') result.report = order.report
  return result
}

function json(response, status, payload) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'same-origin',
  })
  response.end(JSON.stringify(payload))
}

async function readJSON(request) {
  let raw = ''
  for await (const chunk of request) {
    raw += chunk
    if (raw.length > 96_000) throw new Error('请求数据过大')
  }
  try {
    return JSON.parse(raw || '{}')
  } catch {
    throw new Error('请求格式无效')
  }
}

function createRateLimiter() {
  const buckets = new Map()
  return (key) => {
    const now = Date.now()
    const bucket = (buckets.get(key) ?? []).filter((timestamp) => now - timestamp < 60_000)
    if (bucket.length >= 12) return false
    bucket.push(now)
    buckets.set(key, bucket)
    return true
  }
}

async function postForm(url, values, timeout = 10_000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: values.toString(),
      signal: controller.signal,
    })
    const text = await response.text()
    if (!response.ok) throw new Error(`payment gateway returned HTTP ${response.status}`)
    return JSON.parse(text)
  } finally {
    clearTimeout(timer)
  }
}

async function queryPayment(order, config) {
  const values = new URLSearchParams({
    act: 'order',
    pid: config.payPid,
    key: config.payKey,
    out_trade_no: order.orderNo,
  })
  const payload = await postForm(`${config.payGatewayUrl}/api.php`, values)
  return payload.code === 1 && Number(payload.status) === 1 && payload.money === REPORT_PRICE
}

async function createPayment(order, clientIP, config) {
  const values = new URLSearchParams({
    pid: config.payPid,
    type: config.payType,
    out_trade_no: order.orderNo,
    notify_url: `${config.publicBaseUrl}/api/payment/notify`,
    return_url: `${config.publicBaseUrl}/?report_order=${order.token}`,
    name: PRODUCT_NAME,
    money: REPORT_PRICE,
    clientip: clientIP,
    param: order.token,
  })
  if (config.payChannelId) values.set('cid', config.payChannelId)
  values.set('sign', signValues(values, config.payKey))
  values.set('sign_type', 'MD5')

  const payload = await postForm(`${config.payGatewayUrl}/mapi.php`, values)
  if (payload.code !== 1 || !payload.trade_no) throw new Error(payload.msg || '创建支付订单失败')
  const payUrl = payload.payurl || payload.payurl2 || `${config.payGatewayUrl}/cashier/${payload.trade_no}`
  if (!/^https:\/\//.test(payUrl)) throw new Error('支付网关未返回安全收银地址')
  return { platformTradeNo: payload.trade_no, payUrl }
}

export function createReportServer(configOverrides = {}) {
  const config = {
    port: Number(process.env.PORT || 33200),
    publicBaseUrl: required('PUBLIC_BASE_URL'),
    dataFile: process.env.DATA_FILE || '/var/lib/sb-index-report/orders.json',
    payGatewayUrl: required('PAY_GATEWAY_URL').replace(/\/$/, ''),
    payPid: required('PAY_PID'),
    payKey: required('PAY_KEY'),
    payType: process.env.PAY_TYPE || 'alipay',
    payChannelId: process.env.PAY_CHANNEL_ID || '',
    ...configOverrides,
  }
  const store = config.store ?? new OrderStore(config.dataFile)
  const allowCreate = createRateLimiter()

  const server = http.createServer(async (request, response) => {
    const requestURL = new URL(request.url, 'http://localhost')
    const clientIP = (request.headers['x-forwarded-for']?.split(',')[0] || request.socket.remoteAddress || '').trim()

    try {
      if (request.method === 'GET' && requestURL.pathname === '/healthz') {
        return json(response, 200, { ok: true, service: 'sb-index-report' })
      }

      if (request.method === 'POST' && requestURL.pathname === '/orders') {
        if (!allowCreate(clientIP)) return json(response, 429, { error: '下单过于频繁，一分钟后再试' })
        const { report } = await readJSON(request)
        const token = randomBytes(24).toString('hex')
        const order = {
          token,
          orderNo: `SBTI${Date.now()}${randomBytes(4).toString('hex').toUpperCase()}`,
          status: 'pending',
          createdAt: new Date().toISOString(),
          lastQueriedAt: 0,
          report: validateReport(report),
        }
        const payment = await createPayment(order, clientIP, config)
        Object.assign(order, payment)
        await store.save(order)
        return json(response, 201, publicOrder(order))
      }

      const orderMatch = requestURL.pathname.match(/^\/orders\/([a-f0-9]{48})$/)
      if (request.method === 'GET' && orderMatch) {
        const order = store.findByToken(orderMatch[1])
        if (!order) return json(response, 404, { error: '订单不存在' })
        if (order.status === 'pending' && Date.now() - (order.lastQueriedAt || 0) > 1_500) {
          order.lastQueriedAt = Date.now()
          try {
            if (await queryPayment(order, config)) {
              order.status = 'paid'
              order.paidAt = new Date().toISOString()
            } else if (Date.now() - Date.parse(order.createdAt) > 35 * 60_000) {
              order.status = 'expired'
            }
          } catch {
            // 主动查单失败不影响稍后的异步回调。
          }
          await store.save(order)
        }
        return json(response, 200, publicOrder(order, true))
      }

      if (request.method === 'GET' && requestURL.pathname === '/payment/notify') {
        const values = requestURL.searchParams
        if (!verifyValues(values, config.payKey) ||
            values.get('pid') !== config.payPid ||
            values.get('sign_type')?.toUpperCase() !== 'MD5' ||
            values.get('type') !== config.payType ||
            values.get('trade_status') !== 'TRADE_SUCCESS' ||
            values.get('money') !== REPORT_PRICE) {
          response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' })
          return response.end('fail')
        }
        const order = store.findByOrderNo(values.get('out_trade_no'))
        if (!order || !TOKEN_PATTERN.test(order.token)) {
          response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
          return response.end('fail')
        }
        if (values.get('param') !== order.token || values.get('name') !== PRODUCT_NAME) {
          response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' })
          return response.end('fail')
        }
        if (order.status !== 'paid') {
          order.status = 'paid'
          order.paidAt = new Date().toISOString()
          order.platformTradeNo = values.get('trade_no') || order.platformTradeNo
          await store.save(order)
        }
        response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
        return response.end('success')
      }

      json(response, 404, { error: '接口不存在' })
    } catch (error) {
      const message = error.name === 'AbortError' ? '支付网关响应超时' : error.message
      console.error(new Date().toISOString(), request.method, requestURL.pathname, message)
      json(response, 400, { error: message || '服务暂时开小差' })
    }
  })

  return {
    server,
    store,
    config,
    async start() {
      await store.load()
      return new Promise((resolve) => server.listen(config.port, '127.0.0.1', resolve))
    },
  }
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
if (isMain) {
  const app = createReportServer()
  await app.start()
  console.log(`sb-index-report listening on 127.0.0.1:${app.config.port}`)
}
