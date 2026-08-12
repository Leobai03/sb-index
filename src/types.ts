export type PersonaCode =
  | 'RULE'
  | 'MOM'
  | 'BOSS'
  | 'PAIN'
  | 'WIKI'
  | 'SAFE'
  | 'WIND'
  | 'KING'
  | 'DEAD'

export type GapDimension =
  | '目标诚实'
  | '行动兑现'
  | '反馈修正'
  | '长期一致'
  | '责任承担'
  | '自我诚实'

export interface Persona {
  code: PersonaCode
  name: string
  enneagram: string
  tagline: string
  roast: string
  serious: string
  tags: [string, string, string]
  color: string
  lightColor: string
  symbol: string
  expression: 'strict' | 'soft' | 'smug' | 'sad' | 'blank' | 'nervous' | 'wild' | 'angry' | 'sleepy'
}

export interface OptionWeight {
  persona: PersonaCode
  weight: number
}

export interface QuizOption {
  id: string
  text: string
  value?: number
  weights: OptionWeight[]
}

export interface QuizQuestion {
  id: string
  eyebrow: string
  title: string
  kind: 'belief' | 'behavior' | 'style'
  pairId?: string
  dimension?: GapDimension
  options: [QuizOption, QuizOption, QuizOption]
}

export interface PairMeta {
  id: string
  name: string
  dimension: GapDimension
  weight: number
  insight: string
}

export type AnswerMap = Record<string, string>

export interface GapDetail {
  pairId: string
  name: string
  dimension: GapDimension
  gap: number
  normalizedGap: number
  beliefText: string
  behaviorText: string
  insight: string
}

export interface QuizResult {
  index: number
  level: string
  levelNote: string
  persona: Persona
  personaScores: Record<PersonaCode, number>
  dimensions: Record<GapDimension, number>
  topGaps: GapDetail[]
  answeredAt: number
}
