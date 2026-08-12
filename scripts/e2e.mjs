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

for (let index = 0; index < 27; index += 1) {
  await page.locator('.option-card').nth(index % 3).click()
  await page.waitForTimeout(300)
}

await page.waitForSelector('.result-hero')
const gapCount = await page.locator('.gap-item').count()
const rankCount = await page.locator('.rank-row').count()
if (gapCount !== 3 || rankCount !== 9) {
  throw new Error(`结果结构异常：gap=${gapCount}, rank=${rankCount}`)
}

const downloadPromise = page.waitForEvent('download')
await page.getByRole('button', { name: '保存海报' }).click()
const download = await downloadPromise
if (!download.suggestedFilename().endsWith('.png')) throw new Error('分享海报没有生成 PNG')

if (errors.length) throw new Error(errors.join('\n'))
console.log(JSON.stringify({ status: 'passed', gapCount, rankCount, shareCard: download.suggestedFilename() }, null, 2))
await browser.close()
