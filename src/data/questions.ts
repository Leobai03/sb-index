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

const questions: QuizQuestion[] = [
  {
    id: 'style_team', eyebrow: '突发场景 01', kind: 'style',
    title: '团队开会已经乱成菜市场，你第一反应是：',
    options: [
      { id: 'a', text: '重写一份会议纪律，最好精确到谁先呼吸', weights: [{ persona: 'RULE', weight: 3 }, { persona: 'KING', weight: 1 }] },
      { id: 'b', text: '直接接管会议：都别吵，按我说的干', weights: [{ persona: 'KING', weight: 3 }, { persona: 'BOSS', weight: 1 }] },
      { id: 'c', text: '先给每个人倒水，问题可以以后再说', weights: [{ persona: 'MOM', weight: 2 }, { persona: 'DEAD', weight: 2 }] },
    ],
  },
  {
    id: 'behavior_motive', eyebrow: '过去 30 天', kind: 'behavior', pairId: 'motive', dimension: '目标诚实',
    title: '你给项目投入最多时间的事情，实际上是：',
    options: [
      { id: 'a', text: '找客户、谈价格、做能收钱的交付', value: 0, weights: [{ persona: 'BOSS', weight: 2 }, { persona: 'KING', weight: 1 }] },
      { id: 'b', text: '产品和商业各做一点，主要看当天焦虑什么', value: 2, weights: [{ persona: 'SAFE', weight: 1 }, { persona: 'WIND', weight: 1 }] },
      { id: 'c', text: '研究新技术、改愿景、给项目换更高级的名字', value: 4, weights: [{ persona: 'WIKI', weight: 2 }, { persona: 'PAIN', weight: 1 }] },
    ],
  },
  {
    id: 'belief_execution', eyebrow: '嘴上原则', kind: 'belief', pairId: 'execution', dimension: '行动兑现',
    title: '一个新想法刚出现，最正确的处理方式是：',
    options: [
      { id: 'a', text: '先做一个最烂版本，现实自然会教育我', value: 0, weights: [{ persona: 'WIND', weight: 1 }, { persona: 'BOSS', weight: 1 }] },
      { id: 'b', text: '认真规划一下，至少别死得太随便', value: 2, weights: [{ persona: 'SAFE', weight: 2 }, { persona: 'RULE', weight: 1 }] },
      { id: 'c', text: '先把底层逻辑彻底想通，否则行动只是蛮干', value: 4, weights: [{ persona: 'WIKI', weight: 3 }] },
    ],
  },
  {
    id: 'style_success', eyebrow: '灵魂拷问 02', kind: 'style',
    title: '如果明天突然成功，你最想让别人看见什么？',
    options: [
      { id: 'a', text: '看见我早就说过我会成功，截图都留着呢', weights: [{ persona: 'BOSS', weight: 3 }, { persona: 'KING', weight: 1 }] },
      { id: 'b', text: '看见我经历了多少没人理解的孤独', weights: [{ persona: 'PAIN', weight: 3 }] },
      { id: 'c', text: '最好别看见我，看看我的方法论就行', weights: [{ persona: 'WIKI', weight: 3 }, { persona: 'SAFE', weight: 1 }] },
    ],
  },
  {
    id: 'belief_feedback', eyebrow: '嘴上原则', kind: 'belief', pairId: 'feedback', dimension: '反馈修正',
    title: '别人说你的方向错了，成熟的人应该：',
    options: [
      { id: 'a', text: '马上找证据验证，谁是傻逼让数据决定', value: 0, weights: [{ persona: 'BOSS', weight: 1 }, { persona: 'RULE', weight: 1 }] },
      { id: 'b', text: '先听完，但保留“他可能不懂”的最后尊严', value: 2, weights: [{ persona: 'SAFE', weight: 2 }] },
      { id: 'c', text: '坚持自己。伟大的人最初都不被理解', value: 4, weights: [{ persona: 'KING', weight: 2 }, { persona: 'PAIN', weight: 1 }] },
    ],
  },
  {
    id: 'behavior_learning', eyebrow: '过去 30 天', kind: 'behavior', pairId: 'learning', dimension: '行动兑现',
    title: '你最近学到的新东西，最后大多去了哪里？',
    options: [
      { id: 'a', text: '当天就拿去做了个东西，丑但能用', value: 0, weights: [{ persona: 'WIND', weight: 1 }, { persona: 'BOSS', weight: 1 }] },
      { id: 'b', text: '记进笔记，偶尔还能想起它住在哪一页', value: 2, weights: [{ persona: 'SAFE', weight: 1 }, { persona: 'RULE', weight: 1 }] },
      { id: 'c', text: '进入收藏夹，和另外 846 条知识幸福团聚', value: 4, weights: [{ persona: 'WIKI', weight: 3 }, { persona: 'DEAD', weight: 1 }] },
    ],
  },
  {
    id: 'style_idea', eyebrow: '突发场景 03', kind: 'style',
    title: '群里突然有人发：“这个赛道三个月赚一百万。”你会：',
    options: [
      { id: 'a', text: '十分钟后已经买好域名，名字就叫未来', weights: [{ persona: 'WIND', weight: 3 }, { persona: 'BOSS', weight: 1 }] },
      { id: 'b', text: '先列 18 个风险，成功压制自己全部冲动', weights: [{ persona: 'SAFE', weight: 3 }, { persona: 'RULE', weight: 1 }] },
      { id: 'c', text: '把群友叫来开会，我负责当创始人', weights: [{ persona: 'KING', weight: 2 }, { persona: 'BOSS', weight: 2 }] },
    ],
  },
  {
    id: 'belief_longterm', eyebrow: '嘴上原则', kind: 'belief', pairId: 'longterm', dimension: '长期一致',
    title: '关于风口，你最认同哪句话？',
    options: [
      { id: 'a', text: '哪有钱去哪，迁徙也是一种坚定', value: 0, weights: [{ persona: 'WIND', weight: 3 }] },
      { id: 'b', text: '主线不变，偶尔蹭一下时代的顺风车', value: 2, weights: [{ persona: 'BOSS', weight: 1 }, { persona: 'SAFE', weight: 1 }] },
      { id: 'c', text: '真正的长期主义者不应该被短期利益诱惑', value: 4, weights: [{ persona: 'RULE', weight: 2 }, { persona: 'PAIN', weight: 1 }] },
    ],
  },
  {
    id: 'behavior_responsibility', eyebrow: '最近一次失败', kind: 'behavior', pairId: 'responsibility', dimension: '责任承担',
    title: '事情没做成，你脑子里最先出现的是：',
    options: [
      { id: 'a', text: '我哪个判断错了，赶紧改掉别再交学费', value: 0, weights: [{ persona: 'RULE', weight: 1 }, { persona: 'BOSS', weight: 1 }] },
      { id: 'b', text: '我有问题，但这个市场多少也有点不懂事', value: 2, weights: [{ persona: 'SAFE', weight: 2 }, { persona: 'PAIN', weight: 1 }] },
      { id: 'c', text: '队友不行、时机不对、平台限流，证据确凿', value: 4, weights: [{ persona: 'KING', weight: 3 }] },
    ],
  },
  {
    id: 'style_friend', eyebrow: '人际现场 04', kind: 'style',
    title: '朋友凌晨两点说“我完了”，你通常会：',
    options: [
      { id: 'a', text: '立刻接管他的人生，顺便帮他安排到下季度', weights: [{ persona: 'MOM', weight: 3 }, { persona: 'KING', weight: 1 }] },
      { id: 'b', text: '发一篇 9000 字资料：先理解问题的本质', weights: [{ persona: 'WIKI', weight: 3 }] },
      { id: 'c', text: '明早再回。很多人生问题睡一觉就像没看见', weights: [{ persona: 'DEAD', weight: 3 }] },
    ],
  },
  {
    id: 'behavior_perfection', eyebrow: '过去 30 天', kind: 'behavior', pairId: 'perfection', dimension: '行动兑现',
    title: '你上一个“马上就能发”的东西，现在怎么样了？',
    options: [
      { id: 'a', text: '已经发了，还被现实打出了几个补丁', value: 0, weights: [{ persona: 'BOSS', weight: 2 }, { persona: 'WIND', weight: 1 }] },
      { id: 'b', text: '还在微调，但它至少还活在硬盘里', value: 2, weights: [{ persona: 'SAFE', weight: 1 }, { persona: 'RULE', weight: 2 }] },
      { id: 'c', text: '暂缓发布。世界还没准备好，我也没有', value: 4, weights: [{ persona: 'RULE', weight: 2 }, { persona: 'PAIN', weight: 1 }, { persona: 'DEAD', weight: 1 }] },
    ],
  },
  {
    id: 'belief_desire', eyebrow: '嘴上原则', kind: 'belief', pairId: 'desire', dimension: '自我诚实',
    title: '一个人想赚钱、出名、被喜欢，最好的态度是：',
    options: [
      { id: 'a', text: '承认就行，欲望又没要求写思想汇报', value: 0, weights: [{ persona: 'WIND', weight: 1 }, { persona: 'KING', weight: 1 }] },
      { id: 'b', text: '可以想，但最好包装得对社会有点价值', value: 2, weights: [{ persona: 'BOSS', weight: 2 }, { persona: 'MOM', weight: 1 }] },
      { id: 'c', text: '人应该追求更高尚的东西，至少公开场合是', value: 4, weights: [{ persona: 'RULE', weight: 1 }, { persona: 'PAIN', weight: 2 }] },
    ],
  },
  {
    id: 'style_failure', eyebrow: '翻车现场 05', kind: 'style',
    title: '一个你主导的项目烂尾，最像你的收尾动作是：',
    options: [
      { id: 'a', text: '写一篇深度复盘，重点描写这段经历如何塑造我', weights: [{ persona: 'PAIN', weight: 2 }, { persona: 'BOSS', weight: 2 }] },
      { id: 'b', text: '重新制定流程，下次任何人都必须按标准来', weights: [{ persona: 'RULE', weight: 3 }] },
      { id: 'c', text: '等大家忘了。互联网每天都有新的烂尾', weights: [{ persona: 'DEAD', weight: 3 }, { persona: 'WIND', weight: 1 }] },
    ],
  },
  {
    id: 'belief_promise', eyebrow: '嘴上原则', kind: 'belief', pairId: 'promise', dimension: '自我诚实',
    title: '关于承诺，你觉得最体面的做法是：',
    options: [
      { id: 'a', text: '只答应确定能做的，显得普通但不欠债', value: 0, weights: [{ persona: 'RULE', weight: 1 }, { persona: 'SAFE', weight: 1 }] },
      { id: 'b', text: '先答应争取一下，人总要被目标逼一把', value: 2, weights: [{ persona: 'BOSS', weight: 2 }, { persona: 'MOM', weight: 1 }] },
      { id: 'c', text: '让对方先安心，未来的我自然会想办法', value: 4, weights: [{ persona: 'MOM', weight: 2 }, { persona: 'DEAD', weight: 1 }] },
    ],
  },
  {
    id: 'behavior_execution', eyebrow: '过去 30 天', kind: 'behavior', pairId: 'execution', dimension: '行动兑现',
    title: '你最近最想做的那个项目，进展到了：',
    options: [
      { id: 'a', text: '已经有人用、有人骂，最好还有人付钱', value: 0, weights: [{ persona: 'BOSS', weight: 2 }, { persona: 'KING', weight: 1 }] },
      { id: 'b', text: '做了一半，另一半正在等待情绪和奇迹', value: 2, weights: [{ persona: 'SAFE', weight: 1 }, { persona: 'DEAD', weight: 1 }] },
      { id: 'c', text: '资料搜得非常完整，项目本人还没出生', value: 4, weights: [{ persona: 'WIKI', weight: 3 }] },
    ],
  },
  {
    id: 'style_conflict', eyebrow: '人际现场 06', kind: 'style',
    title: '有人当众指出你一个明显错误，你会先：',
    options: [
      { id: 'a', text: '纠正他的语气。错误可以改，态度不能惯', weights: [{ persona: 'KING', weight: 3 }] },
      { id: 'b', text: '笑着说没事，回去后反复回放到凌晨三点', weights: [{ persona: 'PAIN', weight: 2 }, { persona: 'SAFE', weight: 1 }] },
      { id: 'c', text: '转移话题维护气氛，错误留给命运处理', weights: [{ persona: 'DEAD', weight: 3 }, { persona: 'MOM', weight: 1 }] },
    ],
  },
  {
    id: 'behavior_longterm', eyebrow: '过去一年', kind: 'behavior', pairId: 'longterm', dimension: '长期一致',
    title: '回看你的项目列表，最符合哪种地貌？',
    options: [
      { id: 'a', text: '哪里热闹往哪里插旗，主打一个时代都来过', value: 0, weights: [{ persona: 'WIND', weight: 3 }] },
      { id: 'b', text: '有一条主线，旁边长了几棵焦虑的小树', value: 2, weights: [{ persona: 'SAFE', weight: 1 }, { persona: 'BOSS', weight: 1 }] },
      { id: 'c', text: '一直深耕同一件事，可能深到用户都看不见', value: 4, weights: [{ persona: 'WIKI', weight: 2 }, { persona: 'RULE', weight: 1 }] },
    ],
  },
  {
    id: 'belief_responsibility', eyebrow: '嘴上原则', kind: 'belief', pairId: 'responsibility', dimension: '责任承担',
    title: '项目失败时，负责人应该怎么看责任？',
    options: [
      { id: 'a', text: '结果归我。先找自己的错误才有东西能改', value: 0, weights: [{ persona: 'KING', weight: 1 }, { persona: 'RULE', weight: 1 }] },
      { id: 'b', text: '系统问题和个人判断都要看，锅不能一口吞', value: 2, weights: [{ persona: 'SAFE', weight: 2 }] },
      { id: 'c', text: '不能忽视环境，逆风局失败不代表决策有错', value: 4, weights: [{ persona: 'PAIN', weight: 1 }, { persona: 'KING', weight: 2 }] },
    ],
  },
  {
    id: 'style_help', eyebrow: '灵魂拷问 07', kind: 'style',
    title: '你最受不了别人怎么评价你？',
    options: [
      { id: 'a', text: '“你这个人没什么用。”——我白帮那么多了？', weights: [{ persona: 'MOM', weight: 3 }] },
      { id: 'b', text: '“你懂得不多。”——请坐下，我从第一性原理讲', weights: [{ persona: 'WIKI', weight: 3 }] },
      { id: 'c', text: '“你太普通了。”——普通是对我最恶毒的诅咒', weights: [{ persona: 'PAIN', weight: 2 }, { persona: 'BOSS', weight: 1 }] },
    ],
  },
  {
    id: 'belief_learning', eyebrow: '嘴上原则', kind: 'belief', pairId: 'learning', dimension: '行动兑现',
    title: '学一个新东西，怎样才算真的学会？',
    options: [
      { id: 'a', text: '拿它解决过真实问题，最好还因此收过钱', value: 0, weights: [{ persona: 'BOSS', weight: 2 }] },
      { id: 'b', text: '能讲清楚原理，也做过几个练习', value: 2, weights: [{ persona: 'RULE', weight: 1 }, { persona: 'WIKI', weight: 1 }] },
      { id: 'c', text: '建立完整知识体系，暂时没用不代表没价值', value: 4, weights: [{ persona: 'WIKI', weight: 3 }] },
    ],
  },
  {
    id: 'behavior_feedback', eyebrow: '最近一次被质疑', kind: 'behavior', pairId: 'feedback', dimension: '反馈修正',
    title: '别人说你方向错了，你实际上最先做了什么？',
    options: [
      { id: 'a', text: '找数据、问用户，顺便准备好向事实投降', value: 0, weights: [{ persona: 'RULE', weight: 1 }, { persona: 'BOSS', weight: 1 }] },
      { id: 'b', text: '听了一半，另一半时间在判断他够不够资格', value: 2, weights: [{ persona: 'SAFE', weight: 1 }, { persona: 'KING', weight: 1 }] },
      { id: 'c', text: '找三个支持我的人，成功完成民主验证', value: 4, weights: [{ persona: 'KING', weight: 2 }, { persona: 'MOM', weight: 1 }] },
    ],
  },
  {
    id: 'style_future', eyebrow: '未来幻想 08', kind: 'style',
    title: '面对一个重要但麻烦的决定，你最容易：',
    options: [
      { id: 'a', text: '把利弊表做到第七版，风险终于被我养大了', weights: [{ persona: 'SAFE', weight: 3 }, { persona: 'RULE', weight: 1 }] },
      { id: 'b', text: '先开另一个更兴奋的新项目，曲线救国', weights: [{ persona: 'WIND', weight: 3 }] },
      { id: 'c', text: '不决定。时间会替成年人完成很多脏活', weights: [{ persona: 'DEAD', weight: 3 }] },
    ],
  },
  {
    id: 'belief_perfection', eyebrow: '嘴上原则', kind: 'belief', pairId: 'perfection', dimension: '行动兑现',
    title: '一个产品什么时候应该上线？',
    options: [
      { id: 'a', text: '能解决一点问题就上，让用户参与打磨', value: 0, weights: [{ persona: 'WIND', weight: 1 }, { persona: 'BOSS', weight: 1 }] },
      { id: 'b', text: '核心体验过关再上，别拿用户当测试耗材', value: 2, weights: [{ persona: 'RULE', weight: 2 }] },
      { id: 'c', text: '等它足够代表我的审美和能力，否则宁可不发', value: 4, weights: [{ persona: 'RULE', weight: 2 }, { persona: 'PAIN', weight: 2 }] },
    ],
  },
  {
    id: 'behavior_desire', eyebrow: '真实世界', kind: 'behavior', pairId: 'desire', dimension: '自我诚实',
    title: '你明明很想要钱、流量或认可时，通常会：',
    options: [
      { id: 'a', text: '直接说想要，然后研究怎么合法得到', value: 0, weights: [{ persona: 'BOSS', weight: 1 }, { persona: 'WIND', weight: 1 }] },
      { id: 'b', text: '承认一半，再补一句“主要还是创造价值”', value: 2, weights: [{ persona: 'BOSS', weight: 2 }, { persona: 'MOM', weight: 1 }] },
      { id: 'c', text: '公开鄙视它，私下每十分钟刷新一次数据', value: 4, weights: [{ persona: 'PAIN', weight: 2 }, { persona: 'RULE', weight: 1 }] },
    ],
  },
  {
    id: 'style_power', eyebrow: '权力现场 09', kind: 'style',
    title: '如果所有人突然都听你的，你最可能先干什么？',
    options: [
      { id: 'a', text: '统一标准，纠正那些让我难受的小错误', weights: [{ persona: 'RULE', weight: 3 }] },
      { id: 'b', text: '安排大家去实现我已经想好的宏大计划', weights: [{ persona: 'KING', weight: 2 }, { persona: 'BOSS', weight: 2 }] },
      { id: 'c', text: '让大家别吵、互相理解，然后最好别找我', weights: [{ persona: 'DEAD', weight: 2 }, { persona: 'MOM', weight: 2 }] },
    ],
  },
  {
    id: 'belief_motive', eyebrow: '嘴上原则', kind: 'belief', pairId: 'motive', dimension: '目标诚实',
    title: '做一个项目，最值得尊重的目标是什么？',
    options: [
      { id: 'a', text: '赚钱。有人付钱至少说明它没完全自嗨', value: 0, weights: [{ persona: 'BOSS', weight: 2 }, { persona: 'KING', weight: 1 }] },
      { id: 'b', text: '商业和作品都要，成年人不做单选题', value: 2, weights: [{ persona: 'SAFE', weight: 1 }, { persona: 'RULE', weight: 1 }] },
      { id: 'c', text: '追求纯粹价值，钱只是世界迟到的掌声', value: 4, weights: [{ persona: 'PAIN', weight: 2 }, { persona: 'WIKI', weight: 1 }] },
    ],
  },
  {
    id: 'behavior_promise', eyebrow: '过去 30 天', kind: 'behavior', pairId: 'promise', dimension: '自我诚实',
    title: '回看你最近答应别人的事情，完成情况是：',
    options: [
      { id: 'a', text: '大多按时完成，没做的也提前说了', value: 0, weights: [{ persona: 'RULE', weight: 1 }, { persona: 'BOSS', weight: 1 }] },
      { id: 'b', text: '完成一半，剩下一半由“最近有点忙”负责', value: 2, weights: [{ persona: 'SAFE', weight: 1 }, { persona: 'MOM', weight: 1 }] },
      { id: 'c', text: '有些承诺已经被聊天记录考古学永久封存', value: 4, weights: [{ persona: 'DEAD', weight: 3 }, { persona: 'WIND', weight: 1 }] },
    ],
  },
]

export default questions
