import type { PairMeta, QuizQuestion } from '../types'

export const pairMeta: PairMeta[] = [
  { id: 'motive', name: '嘴上使命 vs 真实投入', dimension: '目标诚实', weight: 1.25, insight: '你给目标套上的体面说法，和时间、钱真正流向的地方不是一回事。' },
  { id: 'execution', name: '行动观 vs 实际推进', dimension: '行动兑现', weight: 1.25, insight: '你赞成先做再说，但身体更喜欢继续准备。' },
  { id: 'feedback', name: '接受反馈 vs 被质疑时', dimension: '反馈修正', weight: 1.2, insight: '你理论上欢迎真话，真话出现时却先保护自尊。' },
  { id: 'learning', name: '学习目的 vs 知识库存', dimension: '行动兑现', weight: 1, insight: '你把收藏、看完和真正用过混成了同一件事。' },
  { id: 'longterm', name: '长期主义 vs 风口迁徙', dimension: '长期一致', weight: 1.15, insight: '你说自己长期主义，项目寿命却主要取决于热搜。' },
  { id: 'responsibility', name: '责任观 vs 失败归因', dimension: '责任承担', weight: 1.15, insight: '你认同结果负责，但坏结果出现时责任突然变成了公共财产。' },
  { id: 'perfection', name: '交付原则 vs 上线习惯', dimension: '行动兑现', weight: 1.1, insight: '你知道反馈比幻想重要，却总想再精修一下才面对现实。' },
  { id: 'desire', name: '欲望诚实 vs 对外人设', dimension: '自我诚实', weight: 1.2, insight: '你真正想要的东西，和你愿意承认自己想要的东西差得有点远。' },
  { id: 'promise', name: '承诺原则 vs 兑现记录', dimension: '自我诚实', weight: 1.1, insight: '你承诺时活在未来，交付时才被迫回到现实。' },
]

// 每题只问一个动作，选项尽量一眼能懂。18 道知行配对题负责指数，
// 3 道第一反应题补充人格倾向；删掉重复场景后，整套约 90 秒完成。
const questions: QuizQuestion[] = [
  {
    id: 'style_team', eyebrow: '第一反应 01', kind: 'style',
    title: '群里吵起来了，你会：',
    options: [
      { id: 'a', text: '立规矩，都按流程来', weights: [{ persona: 'RULE', weight: 3 }, { persona: 'KING', weight: 1 }] },
      { id: 'b', text: '别吵了，听我的', weights: [{ persona: 'KING', weight: 3 }, { persona: 'BOSS', weight: 1 }] },
      { id: 'c', text: '先和稀泥，别伤感情', weights: [{ persona: 'MOM', weight: 2 }, { persona: 'DEAD', weight: 1 }, { persona: 'OJBK', weight: 2 }] },
    ],
  },
  {
    id: 'behavior_motive', eyebrow: '最近一个月', kind: 'behavior', pairId: 'motive', dimension: '目标诚实',
    title: '做项目时，你最花时间在：',
    options: [
      { id: 'a', text: '找客户，直接收钱', value: 0, weights: [{ persona: 'BOSS', weight: 2 }, { persona: 'KING', weight: 1 }, { persona: 'COIN', weight: 3 }] },
      { id: 'b', text: '产品、赚钱各搞一点', value: 2, weights: [{ persona: 'SAFE', weight: 1 }, { persona: 'WIND', weight: 1 }] },
      { id: 'c', text: '研究技术，顺便改愿景', value: 4, weights: [{ persona: 'WIKI', weight: 2 }, { persona: 'PAIN', weight: 1 }, { persona: 'PURE', weight: 2 }] },
    ],
  },
  {
    id: 'belief_execution', eyebrow: '你觉得', kind: 'belief', pairId: 'execution', dimension: '行动兑现',
    title: '刚有个新想法，应该：',
    options: [
      { id: 'a', text: '先做个破版本', value: 0, weights: [{ persona: 'WIND', weight: 1 }, { persona: 'BOSS', weight: 1 }, { persona: 'RUSH', weight: 3 }] },
      { id: 'b', text: '先简单规划一下', value: 2, weights: [{ persona: 'SAFE', weight: 2 }, { persona: 'RULE', weight: 1 }] },
      { id: 'c', text: '全部想明白再动手', value: 4, weights: [{ persona: 'WIKI', weight: 3 }] },
    ],
  },
  {
    id: 'style_success', eyebrow: '第一反应 02', kind: 'style',
    title: '如果突然成功，你最想说：',
    options: [
      { id: 'a', text: '看吧，我早就说过', weights: [{ persona: 'BOSS', weight: 3 }, { persona: 'KING', weight: 1 }, { persona: 'COIN', weight: 1 }] },
      { id: 'b', text: '没人知道我多不容易', weights: [{ persona: 'PAIN', weight: 3 }, { persona: 'LOOP', weight: 2 }] },
      { id: 'c', text: '别看我，看方法论', weights: [{ persona: 'WIKI', weight: 3 }, { persona: 'SAFE', weight: 1 }, { persona: 'LOOP', weight: 2 }] },
    ],
  },
  {
    id: 'belief_feedback', eyebrow: '你觉得', kind: 'belief', pairId: 'feedback', dimension: '反馈修正',
    title: '别人说你错了，应该：',
    options: [
      { id: 'a', text: '马上找证据验证', value: 0, weights: [{ persona: 'BOSS', weight: 1 }, { persona: 'RULE', weight: 1 }] },
      { id: 'b', text: '先听听，但未必信', value: 2, weights: [{ persona: 'SAFE', weight: 2 }, { persona: 'NOPE', weight: 1 }] },
      { id: 'c', text: '坚持自己，别被带偏', value: 4, weights: [{ persona: 'KING', weight: 2 }, { persona: 'PAIN', weight: 1 }, { persona: 'NOPE', weight: 3 }] },
    ],
  },
  {
    id: 'behavior_learning', eyebrow: '最近一个月', kind: 'behavior', pairId: 'learning', dimension: '行动兑现',
    title: '你学到的新东西，最后：',
    options: [
      { id: 'a', text: '当天就用上了', value: 0, weights: [{ persona: 'WIND', weight: 1 }, { persona: 'BOSS', weight: 1 }] },
      { id: 'b', text: '记进笔记，偶尔会看', value: 2, weights: [{ persona: 'SAFE', weight: 1 }, { persona: 'RULE', weight: 1 }, { persona: 'LOOP', weight: 1 }] },
      { id: 'c', text: '躺进收藏夹吃灰', value: 4, weights: [{ persona: 'WIKI', weight: 3 }, { persona: 'DEAD', weight: 1 }, { persona: 'LOOP', weight: 2 }] },
    ],
  },
  {
    id: 'belief_longterm', eyebrow: '你觉得', kind: 'belief', pairId: 'longterm', dimension: '长期一致',
    title: '看见新风口，应该：',
    options: [
      { id: 'a', text: '有钱就冲', value: 0, weights: [{ persona: 'WIND', weight: 3 }, { persona: 'RUSH', weight: 1 }, { persona: 'COIN', weight: 2 }] },
      { id: 'b', text: '主线不变，顺手试试', value: 2, weights: [{ persona: 'BOSS', weight: 1 }, { persona: 'SAFE', weight: 1 }] },
      { id: 'c', text: '不追风口，长期深耕', value: 4, weights: [{ persona: 'RULE', weight: 2 }, { persona: 'PAIN', weight: 1 }, { persona: 'PURE', weight: 1 }] },
    ],
  },
  {
    id: 'behavior_responsibility', eyebrow: '最近一次失败', kind: 'behavior', pairId: 'responsibility', dimension: '责任承担',
    title: '事情没做成，你先怪：',
    options: [
      { id: 'a', text: '自己判断错了', value: 0, weights: [{ persona: 'RULE', weight: 1 }, { persona: 'BOSS', weight: 1 }] },
      { id: 'b', text: '自己和环境都有问题', value: 2, weights: [{ persona: 'SAFE', weight: 2 }, { persona: 'PAIN', weight: 1 }] },
      { id: 'c', text: '队友、时机和平台', value: 4, weights: [{ persona: 'KING', weight: 3 }, { persona: 'NOPE', weight: 2 }] },
    ],
  },
  {
    id: 'behavior_perfection', eyebrow: '最近一个月', kind: 'behavior', pairId: 'perfection', dimension: '行动兑现',
    title: '上个“马上发布”的东西：',
    options: [
      { id: 'a', text: '已经发了', value: 0, weights: [{ persona: 'BOSS', weight: 2 }, { persona: 'WIND', weight: 1 }, { persona: 'RUSH', weight: 1 }] },
      { id: 'b', text: '还在微调', value: 2, weights: [{ persona: 'SAFE', weight: 1 }, { persona: 'RULE', weight: 2 }, { persona: 'LATER', weight: 2 }] },
      { id: 'c', text: '已经忘了', value: 4, weights: [{ persona: 'RULE', weight: 2 }, { persona: 'PAIN', weight: 1 }, { persona: 'DEAD', weight: 1 }, { persona: 'LATER', weight: 2 }, { persona: 'PURE', weight: 2 }] },
    ],
  },
  {
    id: 'belief_desire', eyebrow: '你觉得', kind: 'belief', pairId: 'desire', dimension: '自我诚实',
    title: '想赚钱、出名，最好：',
    options: [
      { id: 'a', text: '直接承认', value: 0, weights: [{ persona: 'WIND', weight: 1 }, { persona: 'KING', weight: 1 }, { persona: 'COIN', weight: 2 }] },
      { id: 'b', text: '承认，但说得体面点', value: 2, weights: [{ persona: 'BOSS', weight: 2 }, { persona: 'MOM', weight: 1 }, { persona: 'COIN', weight: 3 }] },
      { id: 'c', text: '别太俗，要追求理想', value: 4, weights: [{ persona: 'RULE', weight: 1 }, { persona: 'PAIN', weight: 2 }, { persona: 'PURE', weight: 3 }] },
    ],
  },
  {
    id: 'belief_promise', eyebrow: '你觉得', kind: 'belief', pairId: 'promise', dimension: '自我诚实',
    title: '别人找你帮忙，应该：',
    options: [
      { id: 'a', text: '能做到才答应', value: 0, weights: [{ persona: 'RULE', weight: 1 }, { persona: 'SAFE', weight: 1 }] },
      { id: 'b', text: '先答应，再努力做到', value: 2, weights: [{ persona: 'BOSS', weight: 2 }, { persona: 'MOM', weight: 1 }, { persona: 'LATER', weight: 1 }] },
      { id: 'c', text: '先让对方安心再说', value: 4, weights: [{ persona: 'MOM', weight: 2 }, { persona: 'DEAD', weight: 1 }, { persona: 'LATER', weight: 3 }] },
    ],
  },
  {
    id: 'behavior_execution', eyebrow: '最近一个月', kind: 'behavior', pairId: 'execution', dimension: '行动兑现',
    title: '你最想做的项目，现在：',
    options: [
      { id: 'a', text: '已经有人用了', value: 0, weights: [{ persona: 'BOSS', weight: 2 }, { persona: 'KING', weight: 1 }, { persona: 'RUSH', weight: 2 }, { persona: 'COIN', weight: 2 }] },
      { id: 'b', text: '做了一半', value: 2, weights: [{ persona: 'SAFE', weight: 1 }, { persona: 'DEAD', weight: 1 }, { persona: 'LATER', weight: 2 }] },
      { id: 'c', text: '资料齐了，还没开工', value: 4, weights: [{ persona: 'WIKI', weight: 3 }] },
    ],
  },
  {
    id: 'style_future', eyebrow: '第一反应 03', kind: 'style',
    title: '碰上麻烦的决定，你会：',
    options: [
      { id: 'a', text: '继续列利弊', weights: [{ persona: 'SAFE', weight: 3 }, { persona: 'RULE', weight: 1 }] },
      { id: 'b', text: '先去做别的新项目', weights: [{ persona: 'WIND', weight: 3 }, { persona: 'RUSH', weight: 3 }] },
      { id: 'c', text: '拖着，等它自己消失', weights: [{ persona: 'DEAD', weight: 3 }, { persona: 'LATER', weight: 3 }] },
    ],
  },
  {
    id: 'behavior_longterm', eyebrow: '过去一年', kind: 'behavior', pairId: 'longterm', dimension: '长期一致',
    title: '你的项目列表更像：',
    options: [
      { id: 'a', text: '什么火就做什么', value: 0, weights: [{ persona: 'WIND', weight: 3 }] },
      { id: 'b', text: '一条主线，偶尔跑偏', value: 2, weights: [{ persona: 'SAFE', weight: 1 }, { persona: 'BOSS', weight: 1 }] },
      { id: 'c', text: '一直只做一件事', value: 4, weights: [{ persona: 'WIKI', weight: 2 }, { persona: 'RULE', weight: 1 }] },
    ],
  },
  {
    id: 'belief_responsibility', eyebrow: '你觉得', kind: 'belief', pairId: 'responsibility', dimension: '责任承担',
    title: '项目失败，负责人应该：',
    options: [
      { id: 'a', text: '先找自己的错', value: 0, weights: [{ persona: 'KING', weight: 1 }, { persona: 'RULE', weight: 1 }] },
      { id: 'b', text: '自己和环境都分析', value: 2, weights: [{ persona: 'SAFE', weight: 2 }] },
      { id: 'c', text: '逆风失败不一定是错', value: 4, weights: [{ persona: 'PAIN', weight: 1 }, { persona: 'KING', weight: 2 }, { persona: 'NOPE', weight: 2 }] },
    ],
  },
  {
    id: 'belief_learning', eyebrow: '你觉得', kind: 'belief', pairId: 'learning', dimension: '行动兑现',
    title: '学到什么程度才算会：',
    options: [
      { id: 'a', text: '真的用它解决过问题', value: 0, weights: [{ persona: 'BOSS', weight: 2 }, { persona: 'COIN', weight: 2 }] },
      { id: 'b', text: '能讲懂，也练过', value: 2, weights: [{ persona: 'RULE', weight: 1 }, { persona: 'WIKI', weight: 1 }] },
      { id: 'c', text: '完整理解原理', value: 4, weights: [{ persona: 'WIKI', weight: 3 }, { persona: 'LOOP', weight: 3 }] },
    ],
  },
  {
    id: 'behavior_feedback', eyebrow: '最近一次被质疑', kind: 'behavior', pairId: 'feedback', dimension: '反馈修正',
    title: '别人说你错了，你先：',
    options: [
      { id: 'a', text: '找数据验证', value: 0, weights: [{ persona: 'RULE', weight: 1 }, { persona: 'BOSS', weight: 1 }] },
      { id: 'b', text: '判断他懂不懂', value: 2, weights: [{ persona: 'SAFE', weight: 1 }, { persona: 'KING', weight: 1 }, { persona: 'LOOP', weight: 2 }, { persona: 'NOPE', weight: 2 }] },
      { id: 'c', text: '找人证明我是对的', value: 4, weights: [{ persona: 'KING', weight: 2 }, { persona: 'MOM', weight: 1 }, { persona: 'NOPE', weight: 3 }] },
    ],
  },
  {
    id: 'belief_perfection', eyebrow: '你觉得', kind: 'belief', pairId: 'perfection', dimension: '行动兑现',
    title: '产品什么时候该上线：',
    options: [
      { id: 'a', text: '能用就上', value: 0, weights: [{ persona: 'WIND', weight: 1 }, { persona: 'BOSS', weight: 1 }, { persona: 'RUSH', weight: 1 }] },
      { id: 'b', text: '核心体验做好再上', value: 2, weights: [{ persona: 'RULE', weight: 2 }] },
      { id: 'c', text: '足够完美再上', value: 4, weights: [{ persona: 'RULE', weight: 2 }, { persona: 'PAIN', weight: 2 }, { persona: 'PURE', weight: 2 }] },
    ],
  },
  {
    id: 'behavior_desire', eyebrow: '平时的你', kind: 'behavior', pairId: 'desire', dimension: '自我诚实',
    title: '很想要钱或流量时，你会：',
    options: [
      { id: 'a', text: '直接说我想要', value: 0, weights: [{ persona: 'BOSS', weight: 1 }, { persona: 'WIND', weight: 1 }, { persona: 'COIN', weight: 3 }] },
      { id: 'b', text: '承认，但补一句理想', value: 2, weights: [{ persona: 'BOSS', weight: 2 }, { persona: 'MOM', weight: 1 }, { persona: 'COIN', weight: 3 }] },
      { id: 'c', text: '嘴上不屑，偷偷刷新', value: 4, weights: [{ persona: 'PAIN', weight: 2 }, { persona: 'RULE', weight: 1 }, { persona: 'PURE', weight: 3 }] },
    ],
  },
  {
    id: 'belief_motive', eyebrow: '你觉得', kind: 'belief', pairId: 'motive', dimension: '目标诚实',
    title: '做项目，最值得追求的是：',
    options: [
      { id: 'a', text: '赚钱', value: 0, weights: [{ persona: 'BOSS', weight: 2 }, { persona: 'KING', weight: 1 }, { persona: 'COIN', weight: 3 }] },
      { id: 'b', text: '赚钱，也做作品', value: 2, weights: [{ persona: 'SAFE', weight: 1 }, { persona: 'RULE', weight: 1 }] },
      { id: 'c', text: '理想，钱不重要', value: 4, weights: [{ persona: 'PAIN', weight: 2 }, { persona: 'WIKI', weight: 1 }, { persona: 'PURE', weight: 3 }] },
    ],
  },
  {
    id: 'behavior_promise', eyebrow: '最近一个月', kind: 'behavior', pairId: 'promise', dimension: '自我诚实',
    title: '你答应别人的事，最后：',
    options: [
      { id: 'a', text: '大多按时做完', value: 0, weights: [{ persona: 'RULE', weight: 1 }, { persona: 'BOSS', weight: 1 }] },
      { id: 'b', text: '做完一半', value: 2, weights: [{ persona: 'SAFE', weight: 1 }, { persona: 'MOM', weight: 1 }, { persona: 'LATER', weight: 1 }, { persona: 'OJBK', weight: 2 }] },
      { id: 'c', text: '聊天记录里见', value: 4, weights: [{ persona: 'DEAD', weight: 3 }, { persona: 'WIND', weight: 1 }, { persona: 'LATER', weight: 3 }] },
    ],
  },
]

export default questions
