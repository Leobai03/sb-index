import type { PaidReport } from '../types'

export type ReportOrderStatus = 'pending' | 'paid' | 'expired' | 'failed'

export interface ReportOrder {
  token: string
  orderNo: string
  platformTradeNo: string
  status: ReportOrderStatus
  amount: string
  payUrl: string
  createdAt: string
  paidAt?: string
  report?: PaidReport
}

const configuredApi = import.meta.env.VITE_REPORT_API_URL?.trim()
const apiBase = (configuredApi || `${import.meta.env.BASE_URL}api`).replace(/\/$/, '')

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBase}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })
  const payload = await response.json().catch(() => ({})) as { error?: string }
  if (!response.ok) throw new Error(payload.error || '请求失败，稍后再试')
  return payload as T
}

export function createReportOrder(report: PaidReport) {
  return request<ReportOrder>('/orders', {
    method: 'POST',
    body: JSON.stringify({ report }),
  })
}

export function getReportOrder(token: string) {
  return request<ReportOrder>(`/orders/${encodeURIComponent(token)}`)
}
