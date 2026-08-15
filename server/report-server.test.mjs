import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { test } from 'node:test'
import { createReportServer, signValues, verifyValues } from './report-server.mjs'

test('易支付签名排除 sign 和 sign_type，并按键名排序', () => {
  const values = new URLSearchParams({
    pid: '10001',
    money: '9.90',
    name: '测试报告',
    sign_type: 'MD5',
  })
  const expected = createHash('md5').update('money=9.90&name=测试报告&pid=10001SECRET').digest('hex')
  assert.equal(signValues(values, 'SECRET'), expected)
  values.set('sign', expected)
  assert.equal(verifyValues(values, 'SECRET'), true)
  values.set('money', '0.01')
  assert.equal(verifyValues(values, 'SECRET'), false)
})

test('只有签名、商户、状态和 9.90 金额全部一致才交付报告', async () => {
  process.env.PUBLIC_BASE_URL = 'https://merchant.example/sbti'
  process.env.PAY_GATEWAY_URL = 'https://pay.example'
  process.env.PAY_PID = 'PID-1'
  process.env.PAY_KEY = 'SECRET'

  const order = {
    token: 'a'.repeat(48),
    orderNo: 'SBTI-TEST-1',
    platformTradeNo: 'TP-1',
    status: 'pending',
    createdAt: new Date().toISOString(),
    report: { version: 1 },
  }
  const store = {
    async load() {},
    findByToken: (token) => token === order.token ? order : undefined,
    findByOrderNo: (orderNo) => orderNo === order.orderNo ? order : undefined,
    async save(next) { Object.assign(order, next) },
  }
  const app = createReportServer({ port: 0, store, payPid: 'PID-1', payKey: 'SECRET' })
  await app.start()
  const port = app.server.address().port

  const callback = new URLSearchParams({
    pid: 'PID-1', trade_no: 'TP-PAID', out_trade_no: order.orderNo,
    type: 'alipay', name: 'SB Index 完整知行对账书', money: '9.90', trade_status: 'TRADE_SUCCESS', param: order.token,
  })
  callback.set('sign', signValues(callback, 'SECRET'))
  callback.set('sign_type', 'MD5')
  const response = await fetch(`http://127.0.0.1:${port}/payment/notify?${callback}`)
  assert.equal(await response.text(), 'success')
  assert.equal(order.status, 'paid')
  assert.equal(order.platformTradeNo, 'TP-PAID')

  app.server.close()
})
