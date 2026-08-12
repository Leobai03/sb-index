import type { QuizResult } from '../types'

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 4,
) {
  const chars = [...text]
  const lines: string[] = []
  let line = ''
  for (const char of chars) {
    const test = line + char
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line)
      line = char
      if (lines.length === maxLines - 1) break
    } else {
      line = test
    }
  }
  if (line) lines.push(line)
  lines.slice(0, maxLines).forEach((item, index) => ctx.fillText(item, x, y + index * lineHeight))
}

export function buildShareCard(result: QuizResult): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = 1080
  canvas.height = 1440
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  ctx.fillStyle = '#f3f0e7'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = '#151810'
  ctx.fillRect(68, 66, 944, 92)
  ctx.fillStyle = '#65e84a'
  ctx.font = '900 38px Arial, PingFang SC, sans-serif'
  ctx.fillText('SB INDEX / 知行偏离测试', 108, 125)

  ctx.fillStyle = result.persona.lightColor
  ctx.fillRect(68, 202, 944, 544)
  ctx.strokeStyle = '#151810'
  ctx.lineWidth = 8
  ctx.strokeRect(68, 202, 944, 544)

  ctx.fillStyle = '#151810'
  ctx.font = '900 36px Arial, PingFang SC, sans-serif'
  ctx.fillText('我的傻逼指数', 112, 276)
  ctx.font = '900 198px Arial Black, Arial, sans-serif'
  ctx.fillText(String(result.index).padStart(2, '0'), 102, 478)
  ctx.font = '900 48px Arial, sans-serif'
  ctx.fillText('/ 100', 440, 470)

  ctx.fillStyle = result.persona.color
  ctx.fillRect(682, 250, 240, 240)
  ctx.fillStyle = '#151810'
  ctx.font = '900 92px Arial Black, Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(result.persona.symbol, 802, 405)
  ctx.textAlign = 'left'

  ctx.fillStyle = '#151810'
  ctx.font = '900 30px Arial, PingFang SC, sans-serif'
  ctx.fillText(`等级：${result.level}`, 112, 560)
  ctx.font = '900 66px Arial Black, PingFang SC, sans-serif'
  ctx.fillText(`${result.persona.code} · ${result.persona.name}`, 112, 650)

  ctx.fillStyle = '#fff'
  ctx.fillRect(68, 792, 944, 430)
  ctx.strokeStyle = '#151810'
  ctx.lineWidth = 6
  ctx.strokeRect(68, 792, 944, 430)

  ctx.fillStyle = '#38b51f'
  ctx.font = '900 27px Arial, PingFang SC, sans-serif'
  ctx.fillText('系统毒舌', 112, 860)
  ctx.fillStyle = '#151810'
  ctx.font = '900 40px Arial, PingFang SC, sans-serif'
  wrapText(ctx, result.persona.roast, 112, 925, 846, 58, 4)

  const tagsY = 1134
  let tagX = 112
  result.persona.tags.forEach((tag) => {
    ctx.font = '800 24px Arial, PingFang SC, sans-serif'
    const width = ctx.measureText(tag).width + 46
    ctx.fillStyle = '#e3fbdc'
    ctx.fillRect(tagX, tagsY, width, 54)
    ctx.fillStyle = '#151810'
    ctx.fillText(tag, tagX + 23, tagsY + 36)
    tagX += width + 16
  })

  ctx.fillStyle = '#151810'
  ctx.fillRect(68, 1270, 944, 102)
  ctx.fillStyle = '#fff'
  ctx.font = '700 28px Arial, PingFang SC, sans-serif'
  ctx.fillText('知与行偏离越大，傻逼指数越高。', 108, 1333)
  ctx.fillStyle = '#65e84a'
  ctx.textAlign = 'right'
  ctx.font = '900 28px Arial Black, sans-serif'
  ctx.fillText('测测你自己 →', 972, 1333)
  ctx.textAlign = 'left'

  return canvas
}

export function downloadShareCard(result: QuizResult) {
  const canvas = buildShareCard(result)
  const link = document.createElement('a')
  link.download = `傻逼指数-${result.persona.code}-${result.index}.png`
  link.href = canvas.toDataURL('image/png')
  link.click()
}

export async function shareResult(result: QuizResult) {
  const canvas = buildShareCard(result)
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
  const text = `我的傻逼指数是 ${result.index}，人格是「${result.persona.name}」。你也来对个账。`
  if (blob && navigator.share && navigator.canShare) {
    const file = new File([blob], `傻逼指数-${result.persona.code}.png`, { type: 'image/png' })
    if (navigator.canShare({ files: [file] })) {
      await navigator.share({ title: '傻逼指数测试', text, files: [file] })
      return 'shared'
    }
  }
  await navigator.clipboard?.writeText(text)
  downloadShareCard(result)
  return 'downloaded'
}
