import { chromium } from 'playwright'

const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:5173/'
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
const errors = []
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text())
})
page.on('pageerror', (error) => errors.push(error.message))

await page.goto(baseUrl, { waitUntil: 'networkidle' })
await page.getByRole('button', { name: /开始对账|继续对账/ }).click()

let answered = 0
const progressText = await page.locator('.progress-meta span').first().textContent()
const questionCount = Number(progressText?.split('/')[1]?.trim())
if (!Number.isInteger(questionCount) || questionCount <= 0) throw new Error(`题目数量异常：${progressText}`)
while (answered < questionCount) {
  await page.locator('.option-card').nth(answered % 3).click()
  await page.waitForTimeout(200)
  answered += 1
}

await page.waitForSelector('.result-hero')
const gapCount = await page.locator('.gap-item').count()
const rankCount = await page.locator('.rank-row').count()
const premiumVisible = await page.locator('.premium-offer').isVisible()
const creatorVisible = await page.locator('.creator-section').isVisible()
const paymentCopyVisible = await page.getByRole('button', { name: '支付 ¥9.9，解锁完整报告' }).isVisible()
const douyinIdVisible = await page.getByText('抖音号：29383494505').isVisible()
if (gapCount !== 3 || rankCount !== 16 || !premiumVisible || !creatorVisible || !paymentCopyVisible || !douyinIdVisible) {
  throw new Error(`结果结构异常：gap=${gapCount}, rank=${rankCount}, premium=${premiumVisible}, creator=${creatorVisible}, paymentCopy=${paymentCopyVisible}, douyin=${douyinIdVisible}`)
}

const downloadPromise = page.waitForEvent('download')
await page.getByRole('button', { name: '保存海报' }).click()
const download = await downloadPromise
if (!download.suggestedFilename().endsWith('.png')) throw new Error('分享海报没有生成 PNG')

if (errors.length) throw new Error(errors.join('\n'))
console.log(JSON.stringify({ status: 'passed', answered, gapCount, rankCount, premiumVisible, creatorVisible, paymentCopyVisible, douyinIdVisible, shareCard: download.suggestedFilename() }, null, 2))
await browser.close()
