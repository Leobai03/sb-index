const businessUrl = import.meta.env.VITE_BUSINESS_URL?.trim()

export const creator = {
  name: '天策',
  bio: '一个还在用真实项目验证自己的 00 后创业者。',
  douyinName: '@天策',
  douyinId: '29383494505',
  douyinQr: `${import.meta.env.BASE_URL}creator-douyin.jpg?v=20260816-2`,
  xHandle: '@Leobai825',
  xUrl: 'https://x.com/Leobai825',
  businessUrl: businessUrl || 'https://x.com/Leobai825',
}
