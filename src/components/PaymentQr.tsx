import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

interface PaymentQrProps {
  payUrl: string
  amount: string
}

export default function PaymentQr({ payUrl, amount }: PaymentQrProps) {
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    setImageUrl('')
    setError(false)

    QRCode.toDataURL(payUrl, {
      width: 320,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: { dark: '#151713', light: '#ffffff' },
    }).then((url) => {
      if (active) setImageUrl(url)
    }).catch(() => {
      if (active) setError(true)
    })

    return () => {
      active = false
    }
  }, [payUrl])

  return (
    <div className="payment-qr-block">
      <span>支付宝收款码 · {amount}</span>
      {imageUrl ? <img src={imageUrl} alt={`${amount} 支付宝订单收款码`} /> : (
        <div className="payment-qr-loading">{error ? '支付码加载失败，请点上方按钮' : '正在生成收款码…'}</div>
      )}
      <b>打开支付宝扫一扫</b>
    </div>
  )
}
