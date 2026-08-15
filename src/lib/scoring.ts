import { pairMeta, default as questions } from '../data/questions'
import { personaMap, personas } from '../data/personas'
import type {
  AnswerMap,
  GapDimension,
  PersonaCode,
  QuizOption,
  QuizResult,
} from '../types'

const dimensions: GapDimension[] = [
  '目标诚实',
  '行动兑现',
  '反馈修正',
  '长期一致',
  '责任承担',
  '自我诚实',
]

function findOption(questionId: string, optionId: string): QuizOption | undefined {
  return questions.find((question) => question.id === questionId)?.options.find((option) => option.id === optionId)
}

export function getResultLevel(index: number) {
  if (index <= 19) return { level: '稀有人类', note: '你至少知道自己要什么，也基本照着做。先别骄傲。' }
  if (index <= 39) return { level: '偶尔嘴硬', note: '大方向还算一致，小地方经常给自己找台阶。' }
  if (index <= 59) return { level: '自我感动', note: '你已经开始用努力感，替代真正的结果感。' }
  if (index <= 79) return { level: '精神董事长', note: '嘴上战略清晰，身体另有董事会，双方常年失联。' }
  return { level: '叙事主权失守', note: '你的人设和肉身已经分别成立公司，且互不控股。' }
}

export function calculateResult(answers: AnswerMap): QuizResult {
  const personaScores = Object.fromEntries(
    personas.map((persona) => [persona.code, 0]),
  ) as Record<PersonaCode, number>

  for (const [questionId, optionId] of Object.entries(answers)) {
    const option = findOption(questionId, optionId)
    option?.weights.forEach(({ persona, weight }) => {
      personaScores[persona] += weight
    })
  }

  const gapDetails = pairMeta.map((meta) => {
    const pairQuestions = questions.filter((question) => question.pairId === meta.id)
    const beliefQuestion = pairQuestions.find((question) => question.kind === 'belief')
    const behaviorQuestion = pairQuestions.find((question) => question.kind === 'behavior')
    const beliefOption = beliefQuestion ? findOption(beliefQuestion.id, answers[beliefQuestion.id]) : undefined
    const behaviorOption = behaviorQuestion ? findOption(behaviorQuestion.id, answers[behaviorQuestion.id]) : undefined
    const gap = Math.abs((beliefOption?.value ?? 2) - (behaviorOption?.value ?? 2))

    return {
      pairId: meta.id,
      name: meta.name,
      dimension: meta.dimension,
      gap,
      normalizedGap: Math.round((gap / 4) * 100),
      beliefText: beliefOption?.text ?? '未作答',
      behaviorText: behaviorOption?.text ?? '未作答',
      insight: meta.insight,
    }
  })

  const totalWeight = pairMeta.reduce((sum, meta) => sum + meta.weight, 0)
  const weightedGap = gapDetails.reduce((sum, detail) => {
    const weight = pairMeta.find((meta) => meta.id === detail.pairId)?.weight ?? 1
    return sum + detail.gap * weight
  }, 0)
  const rawIndex = (weightedGap / (4 * totalWeight)) * 100
  // 娱乐化结果需要把中高段差异拉开：完全一致仍是 0，原始偏离达到 80
  // 左右即可进入 100 的极端档，但最终始终限制在 0—100。
  const index = Math.min(100, Math.round(rawIndex * 1.25))

  const dimensionScores = Object.fromEntries(dimensions.map((dimension) => {
    const details = gapDetails.filter((detail) => detail.dimension === dimension)
    const score = details.length
      ? Math.round(details.reduce((sum, detail) => sum + detail.normalizedGap, 0) / details.length)
      : 0
    return [dimension, score]
  })) as Record<GapDimension, number>

  // 不同人格在题库里的触发次数不同，直接比原始分会天然偏向“出镜多”的人格。
  // 这里用随机作答时的期望值与方差做标准化，让每种人格都按“超出自身基线
  // 多少”来竞争，而不是按累计露面次数竞争。
  const standardizedPersonaScores = Object.fromEntries(personas.map((persona) => {
    let expected = 0
    let variance = 0

    questions.forEach((question) => {
      const optionValues = question.options.map((option) =>
        option.weights
          .filter((weight) => weight.persona === persona.code)
          .reduce((sum, weight) => sum + weight.weight, 0),
      )
      const optionMean = optionValues.reduce((sum, value) => sum + value, 0) / optionValues.length
      const optionVariance = optionValues.reduce((sum, value) => sum + ((value - optionMean) ** 2), 0) / optionValues.length
      expected += optionMean
      variance += optionVariance
    })

    const zScore = variance > 0 ? (personaScores[persona.code] - expected) / Math.sqrt(variance) : 0
    return [persona.code, zScore]
  })) as Record<PersonaCode, number>

  const normalizedPersonaScores = Object.fromEntries(personas.map((persona) => {
    const zScore = standardizedPersonaScores[persona.code]
    return [persona.code, Math.round(Math.max(0, Math.min(100, 50 + (zScore * 18))))]
  })) as Record<PersonaCode, number>

  const topPersonaCode = (Object.entries(standardizedPersonaScores) as [PersonaCode, number][])
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0][0]
  const { level, note } = getResultLevel(index)

  return {
    index,
    level,
    levelNote: note,
    persona: personaMap[topPersonaCode],
    personaScores: normalizedPersonaScores,
    dimensions: dimensionScores,
    allGaps: [...gapDetails].sort((a, b) => b.gap - a.gap),
    topGaps: [...gapDetails].sort((a, b) => b.gap - a.gap).slice(0, 3),
    answeredAt: Date.now(),
  }
}
