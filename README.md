# 傻逼指数测试

知与行的偏离度，就是你的傻逼指数。

这是一个移动端优先的娱乐化人格测试。用户凭第一反应完成 21 道秒选题后，会得到：

- 0—100 的知行偏离指数
- 1 个从 16 种动机原型中计算出的原创抽象人格
- 六维偏离雷达图
- 三组“嘴上怎么说 / 实际怎么做”的答案对账
- 可下载或系统分享的 1080×1440 PNG 结果海报

测试、基础结果和分享海报永久免费。用户可一次性支付 ¥9.9 解锁完整报告：九组知行对账、30 天行动计划、MBTI × SB 交叉解读和 PDF 保存。

## 人格图鉴

头上长草者、人形妈味机、赢麻了王、淋雨主角、脑内挖矿工、缩壳预言家、风口吗喽、拿捏虫、棺材体验官、改天人、差不多神、先冲牲口、复盘永动机、高尚穷鬼、不服砖、余额战士。

## 本地开发

```bash
npm install
cp .env.example .env.local
npm run dev
```

当前正式公网地址：[https://tiance.icu/sbti/](https://tiance.icu/sbti/)。备用独立地址：[https://sbti.104.207.92.83.nip.io](https://sbti.104.207.92.83.nip.io)。

前端默认请求同域 API。本地的 `/api` 由 Vite 代理到 `127.0.0.1:33200`，生产构建自动使用 `/sbti/api`：

```bash
VITE_REPORT_API_URL=
REPORT_SERVER_TARGET=http://127.0.0.1:33200
VITE_BUSINESS_URL=https://你的商务表单
```

支付架构：

- 浏览器只向报告服务发起下单，不持有商户 KEY。
- Node.js 报告服务在服务端签名，请求 Tiance Pay 的易支付兼容接口。
- Tiance Pay 通过真实 `zpay-alipay` 通道创建人民币 9.90 元订单。
- 只有异步回调的 PID、签名、金额、商户订单号和交易状态全部一致，才把报告标记为已付费。
- 查单接口是回调丢失时的补偿通道，已支付报告通过 48 位随机令牌访问。

服务端变量只保存在生产机 `/etc/sb-index-report.env`，不进入 Git 仓库。

漏斗事件会写入本地 `localStorage`，同时通过 `sb-index:funnel` 浏览器事件发出，可直接接入 PostHog、Umami 或自有统计系统。

## 部署

项目已部署在新加坡服务器的 `/var/www/sb-index-path`，由 Caddy 托管。更新生产站：

```bash
npm run deploy
```

自定义域名配置模板见 [`deploy/Caddyfile.example`](./deploy/Caddyfile.example)。

## 验证

```bash
npm run lint
npm run build
npm run test:distribution
npm run test:server

# 另一个终端先运行 npm run dev
npm run test:e2e
```

`test:distribution` 会随机模拟 100,000 条答题路径并检查 16 种人格分布；`test:e2e` 会完成整套移动端答题、检查结果结构并验证 PNG 海报下载。

## 目录

```text
src/data/          抽象人格与题库配置
src/lib/scoring.ts 知行偏离和人格匹配算法
src/lib/shareCard.ts 结果海报生成
src/components/    原创低多边形角色、雷达图、付费报告与作者模块
server/            下单、回调验签、查单补偿和报告交付服务
scripts/           分布模拟与端到端测试
```

所有题目、人格名称、解释文案和角色 SVG 均为本项目原创。结果仅供娱乐与自我观察，不用于心理、医学或职业诊断。

## License

[MIT](./LICENSE)
