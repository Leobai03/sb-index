import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(process.cwd(), 'douyin-miniapp')
const require = createRequire(resolve(root, 'package.json'))
const { questions } = require(resolve(root, 'data/questions.js'))
const { personas } = require(resolve(root, 'data/personas.js'))
const { createQuestionOrder } = require(resolve(root, 'utils/questionOrder.js'))
const { calculateResult } = require(resolve(root, 'utils/scoring.js'))

assert.equal(questions.length, 21, '抖音小程序应与网页版保持 21 道题')
assert.equal(personas.length, 16, '抖音小程序应与网页版保持 16 种人格')

const requiredFiles = [
  'project.config.json',
  'app.js',
  'app.json',
  'app.ttss',
  'pages/index/index.js',
  'pages/quiz/quiz.js',
  'pages/result/result.js',
  'pages/types/types.js',
  'pages/about/about.js',
]
requiredFiles.forEach((file) => assert.ok(existsSync(resolve(root, file)), `缺少 ${file}`))

for (let seed = 1; seed <= 50; seed += 1) {
  const ordered = createQuestionOrder(questions, seed)
  for (let visiblePosition = 0; visiblePosition < 3; visiblePosition += 1) {
    const answers = {}
    ordered.forEach((question) => { answers[question.id] = question.options[visiblePosition].id })
    const result = calculateResult(answers)
    assert.ok(result.index > 0, `seed=${seed} 一路选第 ${visiblePosition + 1} 项不应得 0`)
    assert.ok(result.index <= 100, '指数不应超过 100')
  }
}

const maximumGapAnswers = {}
questions.forEach((question) => {
  if (question.kind === 'belief') {
    maximumGapAnswers[question.id] = question.options.find((option) => option.value === 0).id
  } else if (question.kind === 'behavior') {
    maximumGapAnswers[question.id] = question.options.find((option) => option.value === 4).id
  } else {
    maximumGapAnswers[question.id] = question.options[0].id
  }
})
assert.equal(calculateResult(maximumGapAnswers).index, 100, '极端知行偏离组合应可得 100')

const sampleIndices = []
for (let sample = 0; sample < 500; sample += 1) {
  const answers = {}
  questions.forEach((question) => {
    answers[question.id] = question.options[Math.floor(Math.random() * 3)].id
  })
  sampleIndices.push(calculateResult(answers).index)
}
assert.ok(Math.min(...sampleIndices) < Math.max(...sampleIndices), '随机作答结果需有分布差异')

console.log(JSON.stringify({
  questions: questions.length,
  personas: personas.length,
  allSameVisiblePositionSeedsChecked: 50,
  maximumIndex: calculateResult(maximumGapAnswers).index,
  randomSampleRange: [Math.min(...sampleIndices), Math.max(...sampleIndices)],
}, null, 2))
