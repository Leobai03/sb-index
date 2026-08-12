import questions from '../src/data/questions'
import { personas } from '../src/data/personas'
import { calculateResult } from '../src/lib/scoring'
import type { AnswerMap } from '../src/types'

const sampleSize = 100_000
const counts: Record<string, number> = Object.fromEntries(personas.map((persona) => [persona.code, 0]))
const bands: Record<string, number> = { '0-19': 0, '20-39': 0, '40-59': 0, '60-79': 0, '80-100': 0 }
let sum = 0
let min = 100
let max = 0

for (let index = 0; index < sampleSize; index += 1) {
  const answers: AnswerMap = {}
  for (const question of questions) {
    answers[question.id] = question.options[Math.floor(Math.random() * question.options.length)].id
  }
  const result = calculateResult(answers)
  counts[result.persona.code] += 1
  sum += result.index
  min = Math.min(min, result.index)
  max = Math.max(max, result.index)
  const band = result.index <= 19 ? '0-19' : result.index <= 39 ? '20-39' : result.index <= 59 ? '40-59' : result.index <= 79 ? '60-79' : '80-100'
  bands[band] += 1
}

const distribution = Object.fromEntries(
  Object.entries(counts).map(([code, count]) => [code, Number(((count / sampleSize) * 100).toFixed(2))]),
)
const largestShare = Math.max(...Object.values(distribution))
const smallestShare = Math.min(...Object.values(distribution))

console.log(JSON.stringify({ sampleSize, averageIndex: Number((sum / sampleSize).toFixed(2)), min, max, distribution, bands }, null, 2))

if (largestShare > 18 || smallestShare < 4) {
  throw new Error(`人格分布失衡：最大 ${largestShare}%，最小 ${smallestShare}%`)
}
