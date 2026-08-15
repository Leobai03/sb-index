import { ArrowRight, QrCode } from 'lucide-react'
import { creator } from '../config/creator'
import { trackFunnelEvent } from '../lib/analytics'

export default function CreatorSection() {
  return (
    <section className="creator-section">
      <div className="creator-copy">
        <p className="card-label">这玩意儿谁做的</p>
        <h2>骂完你的人，<br />叫天策。</h2>
        <p>{creator.bio}这个测试是他拿自己开刀后，顺手做给所有嘴硬的人。</p>
        <div className="creator-links">
          <a href={creator.xUrl} target="_blank" rel="noreferrer" onClick={() => trackFunnelEvent('creator_clicked', { channel: 'x' })}>
            <span>X / Twitter</span><b>{creator.xHandle}</b><ArrowRight size={16} />
          </a>
          <a href={creator.businessUrl} target="_blank" rel="noreferrer" onClick={() => trackFunnelEvent('creator_clicked', { channel: 'business' })}>
            <span>联名与商务</span><b>找我做一套抽象测试</b><ArrowRight size={16} />
          </a>
        </div>
      </div>
      <div className="creator-douyin">
        <div className="creator-qr-label"><QrCode size={18} /><span>国内主阵地</span></div>
        <img src={creator.douyinQr} alt={`${creator.douyinName}的抖音二维码`} />
        <div><b>{creator.douyinName}</b><span>抖音号：{creator.douyinId}</span></div>
      </div>
    </section>
  )
}
