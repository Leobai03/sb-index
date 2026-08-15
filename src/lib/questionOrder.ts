import type { QuizQuestion } from '../types'

function hash(input: string) {
  let value = 2166136261
  for (let index = 0; index < input.length; index += 1) {
    value ^= input.charCodeAt(index)
    value = Math.imul(value, 16777619)
  }
  return value >>> 0
}

function rotateOptions(question: QuizQuestion, offset: number): QuizQuestion {
  const options = question.options
  return {
    ...question,
    options: [
      options[offset % 3],
      options[(offset + 1) % 3],
      options[(offset + 2) % 3],
    ],
  }
}

/**
 * 同一轮测试内顺序稳定，重测时随 seed 改变。
 * 知行配对题使用错位轮转：同一个可见位置在“嘴上”和“实际”两题里
 * 永远不会对应同一个潜在分值，避免全选 A/B/C 意外得到 0 分。
 */
export function createQuestionOrder(questions: QuizQuestion[], seed: number): QuizQuestion[] {
  const pairBase = new Map<string, number>()
  const pairShift = new Map<string, number>()

  for (const question of questions) {
    if (!question.pairId || pairBase.has(question.pairId)) continue
    pairBase.set(question.pairId, hash(`${seed}:${question.pairId}:base`) % 3)
    pairShift.set(question.pairId, 1 + (hash(`${seed}:${question.pairId}:shift`) % 2))
  }

  return questions.map((question) => {
    if (!question.pairId) return rotateOptions(question, hash(`${seed}:${question.id}`) % 3)
    const base = pairBase.get(question.pairId) ?? 0
    const shift = question.kind === 'behavior' ? (pairShift.get(question.pairId) ?? 1) : 0
    return rotateOptions(question, (base + shift) % 3)
  })
}
