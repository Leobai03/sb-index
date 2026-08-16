const { pairMeta, questions } = require('../data/questions')
const { personas } = require('../data/personas')

const dimensions = ['目标诚实', '行动兑现', '反馈修正', '长期一致', '责任承担', '自我诚实']

function findOption(questionId, optionId) {
  const question = questions.find((item) => item.id === questionId)
  return question && question.options.find((item) => item.id === optionId)
}

function getResultLevel(index) {
  if (index <= 19) return { level: '稀有人类', note: '你至少知道自己要什么，也基本照着做。先别骄傲。' }
  if (index <= 39) return { level: '偶尔嘴硬', note: '大方向还算一致，小地方经常给自己找台阶。' }
  if (index <= 59) return { level: '自我感动', note: '你已经开始用努力感，替代真正的结果感。' }
  if (index <= 79) return { level: '精神董事长', note: '嘴上战略清晰，身体另有董事会，双方常年失联。' }
  return { level: '叙事主权失守', note: '你的人设和肉身已经分别成立公司，且互不控股。' }
}

function calculateResult(answers) {
  const personaScores = {}
  personas.forEach((persona) => { personaScores[persona.code] = 0 })

  Object.keys(answers).forEach((questionId) => {
    const option = findOption(questionId, answers[questionId])
    if (!option) return
    option.weights.forEach(({ persona, weight }) => { personaScores[persona] += weight })
  })

  const gapDetails = pairMeta.map((meta) => {
    const pairQuestions = questions.filter((question) => question.pairId === meta.id)
    const beliefQuestion = pairQuestions.find((question) => question.kind === 'belief')
    const behaviorQuestion = pairQuestions.find((question) => question.kind === 'behavior')
    const beliefOption = beliefQuestion && findOption(beliefQuestion.id, answers[beliefQuestion.id])
    const behaviorOption = behaviorQuestion && findOption(behaviorQuestion.id, answers[behaviorQuestion.id])
    const gap = Math.abs((beliefOption ? beliefOption.value : 2) - (behaviorOption ? behaviorOption.value : 2))

    return {
      pairId: meta.id,
      name: meta.name,
      dimension: meta.dimension,
      gap,
      normalizedGap: Math.round((gap / 4) * 100),
      beliefText: beliefOption ? beliefOption.text : '未作答',
      behaviorText: behaviorOption ? behaviorOption.text : '未作答',
      insight: meta.insight,
    }
  })

  const totalWeight = pairMeta.reduce((sum, meta) => sum + meta.weight, 0)
  const weightedGap = gapDetails.reduce((sum, detail) => {
    const meta = pairMeta.find((item) => item.id === detail.pairId)
    return sum + detail.gap * (meta ? meta.weight : 1)
  }, 0)
  const rawIndex = (weightedGap / (4 * totalWeight)) * 100
  const index = Math.min(100, Math.round(rawIndex * 1.25))

  const dimensionScores = {}
  dimensions.forEach((dimension) => {
    const details = gapDetails.filter((detail) => detail.dimension === dimension)
    dimensionScores[dimension] = details.length
      ? Math.round(details.reduce((sum, detail) => sum + detail.normalizedGap, 0) / details.length)
      : 0
  })

  const standardizedScores = {}
  const normalizedScores = {}
  personas.forEach((persona) => {
    let expected = 0
    let variance = 0
    questions.forEach((question) => {
      const values = question.options.map((option) => option.weights
        .filter((weight) => weight.persona === persona.code)
        .reduce((sum, weight) => sum + weight.weight, 0))
      const mean = values.reduce((sum, value) => sum + value, 0) / values.length
      expected += mean
      variance += values.reduce((sum, value) => sum + ((value - mean) ** 2), 0) / values.length
    })
    const zScore = variance > 0 ? (personaScores[persona.code] - expected) / Math.sqrt(variance) : 0
    standardizedScores[persona.code] = zScore
    normalizedScores[persona.code] = Math.round(Math.max(0, Math.min(100, 50 + (zScore * 18))))
  })

  const topCode = Object.keys(standardizedScores)
    .sort((a, b) => standardizedScores[b] - standardizedScores[a] || a.localeCompare(b))[0]
  const persona = personas.find((item) => item.code === topCode)
  const resultLevel = getResultLevel(index)
  const sortedGaps = gapDetails.slice().sort((a, b) => b.gap - a.gap)

  return {
    index,
    level: resultLevel.level,
    levelNote: resultLevel.note,
    persona,
    personaScores: normalizedScores,
    dimensions: dimensionScores,
    dimensionList: dimensions.map((name) => ({ name, score: dimensionScores[name] })),
    allGaps: sortedGaps,
    topGaps: sortedGaps.slice(0, 3),
    answeredAt: Date.now(),
  }
}

module.exports = { calculateResult, getResultLevel }
