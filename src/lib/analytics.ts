type FunnelEventName =
  | 'quiz_started'
  | 'quiz_completed'
  | 'result_shared'
  | 'report_checkout_clicked'
  | 'report_order_created'
  | 'report_payment_opened'
  | 'report_unlocked'
  | 'business_clicked'
  | 'creator_clicked'

interface FunnelEvent {
  name: FunnelEventName
  timestamp: number
  properties: Record<string, string | number | boolean>
}

const STORAGE_KEY = 'sb-index-funnel-events-v1'

export function trackFunnelEvent(name: FunnelEventName, properties: FunnelEvent['properties'] = {}) {
  const event: FunnelEvent = { name, timestamp: Date.now(), properties }

  try {
    const current = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as FunnelEvent[]
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...current.slice(-99), event]))
  } catch {
    // 埋点不应该影响主流程。
  }

  window.dispatchEvent(new CustomEvent('sb-index:funnel', { detail: event }))
}
