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
  const index = Math.round((weightedGap / (4 * totalWeight)) * 100)

  const dimensionScores = Object.fromEntries(dimensions.map((dimension) => {
    const details = gapDetails.filter((detail) => detail.dimension === dimension)
    const score = details.length
      ? Math.round(details.reduce((sum, detail) => sum + detail.normalizedGap, 0) / details.length)
      : 0
    return [dimension, score]
  })) as Record<GapDimension, number>

  const normalizedPersonaScores = Object.fromEntries(personas.map((persona) => {
    const maximumPossible = questions.reduce((sum, question) => {
      const bestOnQuestion = Math.max(
        0,
        ...question.options.map((option) =>
          option.weights
            .filter((weight) => weight.persona === persona.code)
            .reduce((optionSum, weight) => optionSum + weight.weight, 0),
        ),
      )
      return sum + bestOnQuestion
    }, 0)
    return [
      persona.code,
      maximumPossible > 0 ? Math.round((personaScores[persona.code] / maximumPossible) * 100) : 0,
    ]
  })) as Record<PersonaCode, number>

  const topPersonaCode = (Object.entries(normalizedPersonaScores) as [PersonaCode, number][])
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0][0]
  const { level, note } = getResultLevel(index)

  return {
    index,
    level,
    levelNote: note,
    persona: personaMap[topPersonaCode],
    personaScores: normalizedPersonaScores,
    dimensions: dimensionScores,
    topGaps: [...gapDetails].sort((a, b) => b.gap - a.gap).slice(0, 3),
    answeredAt: Date.now(),
  }
}
