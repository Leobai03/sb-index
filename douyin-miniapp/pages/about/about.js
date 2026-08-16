Page({
  startQuiz() {
    const seed = Date.now() ^ Math.floor(Math.random() * 2147483647)
    tt.setStorageSync('sbti_quiz_seed', seed)
    tt.removeStorageSync('sbti_answers')
    tt.navigateTo({ url: '/pages/quiz/quiz' })
  },

  onShareAppMessage() {
    return { title: '知与行偏离越大，SB 指数越高', path: '/pages/index/index' }
  },
})
