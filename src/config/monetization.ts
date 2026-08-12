const checkoutUrl = import.meta.env.VITE_CHECKOUT_URL?.trim() ?? ''
const businessUrl = import.meta.env.VITE_BUSINESS_URL?.trim() ?? ''

export const monetization = {
  reportPrice: '¥9.9',
  originalPrice: '¥29.9',
  checkoutUrl,
  businessUrl,
  checkoutEnabled: /^https:\/\//.test(checkoutUrl),
  businessEnabled: /^https:\/\//.test(businessUrl),
}
