Page({
  data: {
    lastResult: null,
  },

  onShow() {
    const lastResult = tt.getStorageSync('sbti_last_result') || null
    this.setData({ lastResult })
  },

  startQuiz() {
    const seed = Date.now() ^ Math.floor(Math.random() * 2147483647)
    tt.setStorageSync('sbti_quiz_seed', seed)
    tt.removeStorageSync('sbti_answers')
    tt.navigateTo({ url: '/pages/quiz/quiz' })
  },

  viewLastResult() {
    tt.navigateTo({ url: '/pages/result/result' })
  },

  onShareAppMessage() {
    return {
      title: '测测你嘴上的自己，和真正在做的自己差多远',
      path: '/pages/index/index',
    }
  },
})
