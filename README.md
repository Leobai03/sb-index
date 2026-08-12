# 傻逼指数测试

知与行的偏离度，就是你的傻逼指数。

这是一个移动端优先的娱乐化人格测试。用户完成 27 道荒诞选择题后，会得到：

- 0—100 的知行偏离指数
- 1 个基于九型人格动机结构改写的原创人格
- 六维偏离雷达图
- 三组“嘴上怎么说 / 实际怎么做”的答案对账
- 可下载或系统分享的 1080×1440 PNG 结果海报

## 九种人格

规则圣人、感动绑架者、精神 CEO、苦情主角、概念收藏家、风险预言家、风口候鸟、绝对正确者、装死和平者。

## 本地开发

```bash
npm install
npm run dev
```

## 验证

```bash
npm run lint
npm run build
npm run test:distribution

# 另一个终端先运行 npm run dev
npm run test:e2e
```

`test:distribution` 会随机模拟 100,000 条答题路径并检查九人格分布；`test:e2e` 会完成整套移动端答题、检查结果结构并验证 PNG 海报下载。

## 目录

```text
src/data/          九人格与题库配置
src/lib/scoring.ts 知行偏离和人格匹配算法
src/lib/shareCard.ts 结果海报生成
src/components/    原创低多边形角色与雷达图
scripts/           分布模拟与端到端测试
```

所有题目、人格名称、解释文案和角色 SVG 均为本项目原创。结果仅供娱乐与自我观察，不用于心理、医学或职业诊断。
