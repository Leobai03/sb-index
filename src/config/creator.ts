const businessUrl = import.meta.env.VITE_BUSINESS_URL?.trim()

export const creator = {
  name: '天策',
  bio: '一个还在用真实项目验证自己的 00 后创业者。',
  douyinName: '@天策（AI创业版）',
  douyinId: '69139762731',
  douyinQr: `${import.meta.env.BASE_URL}creator-douyin.jpg`,
  xHandle: '@Leobai825',
  xUrl: 'https://x.com/Leobai825',
  businessUrl: businessUrl || 'https://x.com/Leobai825',
}
