function hash(input) {
  let value = 2166136261
  for (let index = 0; index < input.length; index += 1) {
    value ^= input.charCodeAt(index)
    value = Math.imul(value, 16777619)
  }
  return value >>> 0
}

function rotateOptions(question, offset) {
  const options = question.options
  return Object.assign({}, question, {
    options: [
      options[offset % 3],
      options[(offset + 1) % 3],
      options[(offset + 2) % 3],
    ],
  })
}

function createQuestionOrder(questions, seed) {
  const pairBase = {}
  const pairShift = {}

  questions.forEach((question) => {
    if (!question.pairId || pairBase[question.pairId] !== undefined) return
    pairBase[question.pairId] = hash(`${seed}:${question.pairId}:base`) % 3
    pairShift[question.pairId] = 1 + (hash(`${seed}:${question.pairId}:shift`) % 2)
  })

  return questions.map((question) => {
    if (!question.pairId) return rotateOptions(question, hash(`${seed}:${question.id}`) % 3)
    const base = pairBase[question.pairId] || 0
    const shift = question.kind === 'behavior' ? (pairShift[question.pairId] || 1) : 0
    return rotateOptions(question, (base + shift) % 3)
  })
}

module.exports = { createQuestionOrder }
