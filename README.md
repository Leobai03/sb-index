# 傻逼指数测试

知与行的偏离度，就是你的傻逼指数。

这是一个移动端优先的娱乐化人格测试。用户完成 27 道荒诞选择题后，会得到：

- 0—100 的知行偏离指数
- 1 个从 16 种动机原型中计算出的原创抽象人格
- 六维偏离雷达图
- 三组“嘴上怎么说 / 实际怎么做”的答案对账
- 可下载或系统分享的 1080×1440 PNG 结果海报

测试、基础结果和分享海报永久免费。项目内置可配置的深度报告与品牌合作转化入口，但不会在答题中途打断用户。

## 人格图鉴

头上长草者、人形妈味机、赢麻了王、淋雨主角、脑内挖矿工、缩壳预言家、风口吗喽、拿捏虫、棺材体验官、改天人、差不多神、先冲牲口、复盘永动机、高尚穷鬼、不服砖、余额战士。

## 本地开发

```bash
npm install
cp .env.example .env.local
npm run dev
```

商业化入口通过环境变量配置：

```bash
VITE_CHECKOUT_URL=https://你的收款页
VITE_BUSINESS_URL=https://你的商务表单
```

漏斗事件会写入本地 `localStorage`，同时通过 `sb-index:funnel` 浏览器事件发出，可直接接入 PostHog、Umami 或自有统计系统。

## 验证

```bash
npm run lint
npm run build
npm run test:distribution

# 另一个终端先运行 npm run dev
npm run test:e2e
```

`test:distribution` 会随机模拟 100,000 条答题路径并检查 16 种人格分布；`test:e2e` 会完成整套移动端答题、检查结果结构并验证 PNG 海报下载。

## 目录

```text
src/data/          抽象人格与题库配置
src/lib/scoring.ts 知行偏离和人格匹配算法
src/lib/shareCard.ts 结果海报生成
src/components/    原创低多边形角色与雷达图
scripts/           分布模拟与端到端测试
```

所有题目、人格名称、解释文案和角色 SVG 均为本项目原创。结果仅供娱乐与自我观察，不用于心理、医学或职业诊断。

## License

[MIT](./LICENSE)
