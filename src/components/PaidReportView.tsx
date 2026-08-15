import { CheckCircle2, Download, LockKeyhole, Sparkles } from 'lucide-react'
import { buildMbtiCrossRead, mbtiTypes } from '../lib/fullReport'
import type { PaidReport } from '../types'

interface PaidReportViewProps {
  report: PaidReport
  mbti: typeof mbtiTypes[number]
  onMbtiChange: (value: typeof mbtiTypes[number]) => void
}

export default function PaidReportView({ report, mbti, onMbtiChange }: PaidReportViewProps) {
  const crossRead = buildMbtiCrossRead(mbti, report)

  return (
    <section className="paid-report" id="full-report">
      <header className="paid-report-head">
        <div>
          <p className="card-label"><CheckCircle2 size={14} /> 支付已确认 · 永久阅读</p>
          <h2>{report.title}</h2>
          <p>{report.summary}</p>
        </div>
        <div className="report-seal"><LockKeyhole size={21} /><b>{report.index}</b><span>FULL<br />REPORT</span></div>
      </header>

      <div className="paid-report-section">
        <div className="paid-section-title"><span>01</span><div><p className="card-label">全部知行对账</p><h3>九处嘴和手的案发现场</h3></div></div>
        <div className="full-gap-list">
          {report.allGaps.map((gap, index) => (
            <article className="full-gap-item" key={gap.pairId}>
              <div className="full-gap-score"><span>{String(index + 1).padStart(2, '0')}</span><b>{gap.normalizedGap}%</b></div>
              <div>
                <h4>{gap.name}</h4>
                <div className="full-quote-pair"><p><b>嘴</b>{gap.beliefText}</p><p><b>手</b>{gap.behaviorText}</p></div>
                <small>{gap.insight}</small>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="paid-report-section plan-section">
        <div className="paid-section-title"><span>02</span><div><p className="card-label">30 天反拧巴计划</p><h3>别再收藏道理，开始留证据</h3></div></div>
        <div className="action-plan-grid">
          {report.plan.map((phase) => (
            <article key={phase.period}>
              <span>{phase.period}</span>
              <h4>{phase.title}</h4>
              <p>{phase.action}</p>
              <small><b>验收证据</b>{phase.proof}</small>
            </article>
          ))}
        </div>
      </div>

      <div className="paid-report-section mbti-section">
        <div className="paid-section-title"><span>03</span><div><p className="card-label">MBTI × SB</p><h3>同一种毛病，你会怎么把它活出来</h3></div></div>
        <div className="mbti-picker" role="group" aria-label="选择你的 MBTI">
          {mbtiTypes.map((type) => <button type="button" className={type === mbti ? 'active' : ''} key={type} onClick={() => onMbtiChange(type)}>{type}</button>)}
        </div>
        <article className="mbti-cross-card">
          <Sparkles size={26} />
          <div><h4>{crossRead.headline}</h4>{crossRead.lines.map((line) => <p key={line}>{line}</p>)}</div>
        </article>
      </div>

      <footer className="paid-report-footer">
        <p>这份报告已交付给当前浏览器。保留订单链接，后续仍可打开。</p>
        <button type="button" className="secondary-button" onClick={() => window.print()}><Download size={18} />保存为 PDF</button>
      </footer>
    </section>
  )
}
