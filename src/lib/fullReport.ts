import type { GapDetail, PaidReport, QuizResult } from '../types'

const actionByPair: Record<string, { action: string; proof: string }> = {
  motive: {
    action: '把“我想做一件有价值的事”改写成一个明确的收入、用户或作品目标。',
    proof: '一张包含数字和截止日期的目标截图。',
  },
  execution: {
    action: '把最想做的项目缩成 30 分钟能交付的最烂版本，当天发给一个真人。',
    proof: '一个可访问链接或一段真实对话。',
  },
  feedback: {
    action: '主动找一个可能反对你的人，只问“你觉得我哪里错了？”，全程不解释。',
    proof: '记下对方说对的最小部分，并改掉一处。',
  },
  learning: {
    action: '停止新收藏 7 天，从旧收藏里挑一条，用它解决当前问题。',
    proof: '删除一条无用收藏，留下一个实际产出。',
  },
  longterm: {
    action: '给所有在做项目排序，主线只留一条，其他项目冻结 30 天。',
    proof: '一张只有一个主项目的 30 天看板。',
  },
  responsibility: {
    action: '复盘最近一次失败，只写三条“如果重来，我会改什么”。',
    proof: '其中一条被写进下次的检查清单。',
  },
  perfection: {
    action: '选一个“再改改就发”的东西，删掉一半非必要项，在 24 小时内上线。',
    proof: '真实用户的第一条使用或吐槽记录。',
  },
  desire: {
    action: '补全句子：“我做这件事，就是想得到____。”不允许填“价值”。',
    proof: '把答案告诉一个可以指出你嘴硬的人。',
  },
  promise: {
    action: '列出尚未兑现的承诺，只选一件今天交付，其他主动重谈期限。',
    proof: '一条交付记录，加上一条提前说清楚的延期消息。',
  },
}

function actionFor(gap: GapDetail) {
  return actionByPair[gap.pairId] ?? {
    action: '为这处偏离设计一个 30 分钟内能完成的反向行动。',
    proof: '留下一个别人也能核验的证据。',
  }
}

export function buildPaidReport(result: QuizResult): PaidReport {
  const allGaps = result.allGaps ?? result.topGaps
  const first = allGaps[0]
  const second = allGaps[1] ?? first
  const third = allGaps[2] ?? second
  const firstAction = actionFor(first)
  const secondAction = actionFor(second)
  const thirdAction = actionFor(third)

  return {
    version: 1,
    title: `${result.persona.name}·完整知行对账书`,
    personaCode: result.persona.code,
    personaName: result.persona.name,
    index: result.index,
    generatedAt: Date.now(),
    summary: `你最需要处理的不是“懂得不够多”，而是“${first.name}”。先让一个小动作和你说过的话重新认识。`,
    allGaps,
    plan: [
      {
        period: 'DAY 01–03',
        title: '停止继续解释',
        action: firstAction.action,
        proof: firstAction.proof,
      },
      {
        period: 'DAY 04–10',
        title: '把第二处偏离拉回现实',
        action: secondAction.action,
        proof: secondAction.proof,
      },
      {
        period: 'DAY 11–21',
        title: '建立反复可验证的新记录',
        action: `${thirdAction.action}连续 11 天记录“说了什么 / 做了什么”，不记心情。`,
        proof: thirdAction.proof,
      },
      {
        period: 'DAY 22–30',
        title: '用结果给人设开庭',
        action: '回看前 21 天的证据，保留一个有效动作，删掉其他所有高级表述。',
        proof: '用一句“我现在会做____”取代一句“我本来是____”。',
      },
    ],
  }
}

export const mbtiTypes = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
] as const

const mbtiAxisCopy = {
  I: '你更容易把偏离变成内心独白，外界很晚才看见。',
  E: '你更容易边说边放大人设，群体反馈会加速它。',
  N: '你擅长给行为建立高级叙事，所以更需要可验证的当下证据。',
  S: '你会被已经形成的习惯牵引，改变要从环境和动作入手。',
  T: '你很可能用逻辑为自己辩护，需要让数据拥有最终解释权。',
  F: '你很可能为了关系和自我感受美化偏离，需要区分善意与兑现。',
  J: '你会让计划看起来像结果，每张计划表都必须绑定一个交付。',
  P: '你会让灵活慢慢变成漂移，需要为每次改变方向设置成本。',
} as const

export function buildMbtiCrossRead(mbti: typeof mbtiTypes[number], report: PaidReport) {
  return {
    headline: `${mbti} × ${report.personaName}：你不是不知道，你是太会解释。`,
    lines: mbti.split('').map((letter) => mbtiAxisCopy[letter as keyof typeof mbtiAxisCopy]),
  }
}
