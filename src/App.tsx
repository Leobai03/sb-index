import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronLeft,
  Download,
  RotateCcw,
  Share2,
  Sparkles,
  Timer,
} from 'lucide-react'
import './App.css'
import PolygonAvatar from './components/PolygonAvatar'
import RadarChart from './components/RadarChart'
import { personas } from './data/personas'
import questions from './data/questions'
import { calculateResult } from './lib/scoring'
import { downloadShareCard, shareResult } from './lib/shareCard'
import type { AnswerMap, QuizResult } from './types'

type Screen = 'home' | 'quiz' | 'result'

const ANSWERS_KEY = 'sb-index-answers-v1'
const RESULT_KEY = 'sb-index-result-v1'

function readStoredAnswers(): AnswerMap {
  try {
    return JSON.parse(localStorage.getItem(ANSWERS_KEY) ?? '{}') as AnswerMap
  } catch {
    return {}
  }
}

function readStoredResult(): QuizResult | null {
  try {
    return JSON.parse(localStorage.getItem(RESULT_KEY) ?? 'null') as QuizResult | null
  } catch {
    return null
  }
}

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [answers, setAnswers] = useState<AnswerMap>(readStoredAnswers)
  const [result, setResult] = useState<QuizResult | null>(readStoredResult)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [locked, setLocked] = useState(false)
  const [shareNotice, setShareNotice] = useState('')

  const answeredCount = Object.keys(answers).length
  const currentQuestion = questions[questionIndex]
  const selectedOption = currentQuestion ? answers[currentQuestion.id] : undefined
  const progress = ((questionIndex + 1) / questions.length) * 100

  const sortedPersonaScores = useMemo(() => {
    if (!result) return []
    return personas
      .map((persona) => ({ persona, score: result.personaScores[persona.code] }))
      .sort((a, b) => b.score - a.score)
  }, [result])

  useEffect(() => {
    localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers))
  }, [answers])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [screen])

  function startQuiz() {
    const firstUnanswered = questions.findIndex((question) => !answers[question.id])
    setQuestionIndex(firstUnanswered >= 0 ? firstUnanswered : 0)
    setScreen('quiz')
  }

  function selectAnswer(optionId: string) {
    if (locked) return
    setLocked(true)
    const nextAnswers = { ...answers, [currentQuestion.id]: optionId }
    setAnswers(nextAnswers)

    window.setTimeout(() => {
      if (questionIndex === questions.length - 1) {
        const nextResult = calculateResult(nextAnswers)
        setResult(nextResult)
        localStorage.setItem(RESULT_KEY, JSON.stringify(nextResult))
        setScreen('result')
      } else {
        setQuestionIndex((index) => index + 1)
      }
      setLocked(false)
    }, 260)
  }

  function goBack() {
    if (questionIndex === 0) {
      setScreen('home')
      return
    }
    setQuestionIndex((index) => Math.max(0, index - 1))
  }

  function restart() {
    setAnswers({})
    setResult(null)
    localStorage.removeItem(ANSWERS_KEY)
    localStorage.removeItem(RESULT_KEY)
    setQuestionIndex(0)
    setScreen('quiz')
  }

  async function handleShare() {
    if (!result) return
    try {
      const status = await shareResult(result)
      setShareNotice(status === 'shared' ? '已经叫系统把你公开处刑了' : '海报已下载，文案已复制')
    } catch {
      downloadShareCard(result)
      setShareNotice('海报已下载')
    }
    window.setTimeout(() => setShareNotice(''), 2600)
  }

  if (screen === 'quiz') {
    return (
      <main className="quiz-shell">
        <header className="quiz-header">
          <button className="icon-button" type="button" onClick={goBack} aria-label="返回上一题">
            <ChevronLeft size={22} strokeWidth={2.7} />
          </button>
          <div className="quiz-brand"><span>SB</span> INDEX</div>
          <button className="plain-button" type="button" onClick={() => setScreen('home')}>退出</button>
        </header>

        <div className="progress-meta">
          <span>{String(questionIndex + 1).padStart(2, '0')} / {questions.length}</span>
          <span>别想太久，身体比嘴诚实</span>
        </div>
        <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>

        <section className="question-stage" key={currentQuestion.id}>
          <p className="question-eyebrow">{currentQuestion.eyebrow}</p>
          <h1>{currentQuestion.title}</h1>
          <div className="options-list">
            {currentQuestion.options.map((option, index) => {
              const selected = selectedOption === option.id
              return (
                <button
                  type="button"
                  key={option.id}
                  className={`option-card ${selected ? 'selected' : ''}`}
                  onClick={() => selectAnswer(option.id)}
                  disabled={locked && !selected}
                >
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="option-text">{option.text}</span>
                  <span className="option-check">{selected ? <Check size={18} strokeWidth={3} /> : <ArrowRight size={18} />}</span>
                </button>
              )
            })}
          </div>
          <p className="question-footnote">没有标准答案，只有你愿不愿意承认的答案。</p>
        </section>
      </main>
    )
  }

  if (screen === 'result' && result) {
    const topScore = Math.max(...Object.values(result.personaScores), 1)
    return (
      <main className="result-page">
        <header className="site-header compact">
          <button className="brand-button" type="button" onClick={() => setScreen('home')}>
            <span className="brand-mark">SB</span><span>知行偏离测试</span>
          </button>
          <button className="plain-button" type="button" onClick={restart}><RotateCcw size={15} /> 重测</button>
        </header>

        <section className="result-hero" style={{ '--persona-soft': result.persona.lightColor } as React.CSSProperties}>
          <div className="result-index-block">
            <p className="kicker">检测完成 / 建议先别急着反驳</p>
            <div className="score-line">
              <span className="score-number">{result.index}</span>
              <span className="score-unit">/ 100<br />傻逼指数</span>
            </div>
            <div className="level-chip">{result.level}</div>
            <p className="level-note">{result.levelNote}</p>
          </div>

          <div className="result-persona-block">
            <PolygonAvatar persona={result.persona} size={250} />
            <p className="persona-code">SB TYPE · {result.persona.code}</p>
            <h1>{result.persona.name}</h1>
            <p className="persona-tagline">{result.persona.tagline}</p>
          </div>
        </section>

        <section className="share-bar">
          <div><Sparkles size={19} /><span>这个结果不一定准，但转发一定好笑。</span></div>
          <div className="share-actions">
            <button type="button" className="secondary-button" onClick={() => downloadShareCard(result)}><Download size={18} />保存海报</button>
            <button type="button" className="primary-button small" onClick={handleShare}><Share2 size={18} />公开处刑</button>
          </div>
          {shareNotice && <div className="toast">{shareNotice}</div>}
        </section>

        <section className="result-grid">
          <article className="result-card roast-card">
            <p className="card-label">系统毒舌</p>
            <blockquote>“{result.persona.roast}”</blockquote>
            <div className="tag-row">{result.persona.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </article>

          <article className="result-card radar-card">
            <div>
              <p className="card-label">偏离雷达</p>
              <h2>你主要在哪些地方<br />嘴和身体不熟</h2>
              <p className="muted">数字越高，知行偏离越严重。</p>
            </div>
            <RadarChart values={result.dimensions} />
          </article>

          <article className="result-card gap-card">
            <p className="card-label">三处大型打脸现场</p>
            <h2>嘴上这么说，身体却那样做</h2>
            <div className="gap-list">
              {result.topGaps.map((gap, index) => (
                <div className="gap-item" key={gap.pairId}>
                  <div className="gap-heading"><span>0{index + 1}</span><strong>{gap.name}</strong><em>{gap.normalizedGap}% 偏离</em></div>
                  <div className="quote-pair">
                    <p><b>嘴：</b>{gap.beliefText}</p>
                    <p><b>手：</b>{gap.behaviorText}</p>
                  </div>
                  <p className="gap-insight">{gap.insight}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="result-card serious-card">
            <p className="card-label">说句人话</p>
            <h2>{result.persona.enneagram}</h2>
            <p>{result.persona.serious}</p>
            <div className="one-step">
              <span>现在只做一件事</span>
              <strong>把今天最想解释的那件事，换成一个可以被验证的动作。</strong>
            </div>
          </article>

          <article className="result-card ranking-card">
            <p className="card-label">人格成分表</p>
            <h2>别担心，你不止一种毛病</h2>
            <div className="ranking-list">
              {sortedPersonaScores.map(({ persona, score }, index) => (
                <div className="rank-row" key={persona.code}>
                  <span className="rank-no">{String(index + 1).padStart(2, '0')}</span>
                  <span className="rank-code">{persona.code}</span>
                  <span className="rank-name">{persona.name}</span>
                  <span className="rank-track"><i style={{ width: `${Math.max(4, (score / topScore) * 100)}%`, background: persona.color }} /></span>
                  <b>{score}</b>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="result-cta">
          <p>不服？人的第一反应通常是再测一次。</p>
          <button type="button" className="primary-button" onClick={restart}><RotateCcw size={19} />换个人设再测</button>
        </section>
      </main>
    )
  }

  return (
    <main className="home-page">
      <header className="site-header">
        <button className="brand-button" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="brand-mark">SB</span><span>知行偏离测试</span>
        </button>
        <nav>
          <a href="#types">人格图鉴</a>
          <a href="#theory">它测什么</a>
          {result && <button className="plain-button result-link" type="button" onClick={() => setScreen('result')}>上次结果</button>}
        </nav>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow-pill"><span>V1.0</span> 全网第一个知行对账现场</div>
          <h1>测测你到底<br />有多<span>傻逼</span></h1>
          <p className="hero-subtitle">知与行的偏离度，就是你的傻逼指数。<br />别担心，这里没有正确答案，只有你的人设和肉身是否认识。</p>
          <div className="hero-actions">
            <button type="button" className="primary-button" onClick={startQuiz}>
              {answeredCount > 0 && answeredCount < questions.length ? `继续对账 ${answeredCount}/${questions.length}` : '开始对账'}
              <ArrowRight size={20} strokeWidth={2.8} />
            </button>
            <a className="text-link" href="#types">先看看都有谁 <ArrowDown size={17} /></a>
          </div>
          <div className="hero-meta">
            <span><b>27</b> 道荒诞选择题</span>
            <span><b>3</b> 分钟完成</span>
            <span><b>全</b> 是选择题</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="抽象人格角色预览">
          <div className="hero-poster-label">SBTI 的远房穷亲戚</div>
          <div className="avatar-crowd">
            {personas.slice(0, 6).map((persona, index) => (
              <div className={`crowd-item crowd-${index + 1}`} key={persona.code}>
                <PolygonAvatar persona={persona} size={index === 1 || index === 4 ? 178 : 158} />
                <span>{persona.name}</span>
              </div>
            ))}
          </div>
          <div className="poster-stamp">嘴上懂王<br /><b>行动难民</b></div>
        </div>
      </section>

      <section className="marquee" aria-label="人格名称滚动展示">
        <div>{[...personas, ...personas].map((persona, index) => <span key={`${persona.code}-${index}`}>{persona.name}<i>✦</i></span>)}</div>
      </section>

      <section className="types-section" id="types">
        <div className="section-heading">
          <p className="section-kicker">动机原型 × 中文互联网现状</p>
          <h2>这里没有正常人，<br />只有不同的解释方式</h2>
          <p>把当代人常见的自我欺骗，重新做成一份不完全人格图鉴。</p>
        </div>
        <div className="persona-grid">
          {personas.map((persona, index) => (
            <article className="persona-card" key={persona.code} style={{ '--persona-color': persona.color, '--persona-light': persona.lightColor } as React.CSSProperties}>
              <div className="persona-number">{String(index + 1).padStart(2, '0')}</div>
              <PolygonAvatar persona={persona} size={175} />
              <div className="persona-card-content">
                <p>{persona.code} · {persona.enneagram}</p>
                <h3>{persona.name}</h3>
                <span>{persona.tagline}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="theory-section" id="theory">
        <div className="formula-card">
          <p className="section-kicker">核心公式</p>
          <div className="formula"><span>傻逼指数</span><b>=</b><span>嘴上认同</span><b>−</b><span>实际行为</span></div>
          <p>不同位置的题目会偷偷配对。你怎么理解一件事，和过去 30 天实际上怎么做，差得越远，指数越高。</p>
        </div>
        <div className="theory-points">
          <article><span>01</span><h3>不测智商</h3><p>聪明和傻逼可以同时存在，而且经常合租。</p></article>
          <article><span>02</span><h3>不罚欲望</h3><p>想赚钱就赚钱。真正扣分的是想赚钱却非说自己只爱技术。</p></article>
          <article><span>03</span><h3>只测偏离</h3><p>你说什么不重要。你说的和你做的是否认识，才重要。</p></article>
        </div>
      </section>

      <section className="bottom-cta">
        <div>
          <p>27 道题以后</p>
          <h2>看看你的嘴，<br />和你的身体熟不熟。</h2>
        </div>
        <button type="button" className="primary-button inverse" onClick={startQuiz}><Timer size={21} />开始 3 分钟对账</button>
      </section>

      <footer>
        <div><span className="brand-mark">SB</span><b>知行偏离测试</b></div>
        <p>这是一份娱乐化自我观察，不是心理或医学诊断。</p>
        <p>想得很明白，做得很随机。</p>
      </footer>
    </main>
  )
}

export default App
