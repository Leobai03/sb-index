const { calculateResult } = require('../../utils/scoring')

Page({
  data: {
    result: null,
  },

  onLoad(options) {
    const answers = tt.getStorageSync('sbti_answers') || {}
    if (Object.keys(answers).length) {
      const result = calculateResult(answers)
      tt.setStorageSync('sbti_last_result', result)
      this.setData({ result })
      return
    }

    const lastResult = tt.getStorageSync('sbti_last_result') || null
    if (!lastResult && options.fresh) {
      tt.showToast({ title: '答题记录丢了，重新来一次', icon: 'none' })
      setTimeout(() => tt.redirectTo({ url: '/pages/index/index' }), 900)
      return
    }
    this.setData({ result: lastResult })
  },

  restart() {
    const seed = Date.now() ^ Math.floor(Math.random() * 2147483647)
    tt.setStorageSync('sbti_quiz_seed', seed)
    tt.removeStorageSync('sbti_answers')
    tt.redirectTo({ url: '/pages/quiz/quiz' })
  },

  goHome() {
    tt.switchTab({ url: '/pages/index/index' })
  },

  onShareAppMessage() {
    const result = this.data.result
    return {
      title: result ? `我的 SB 指数 ${result.index}%，人格是「${result.persona.name}」` : '测测你的知行偏离指数',
      path: '/pages/index/index',
    }
  },
})
