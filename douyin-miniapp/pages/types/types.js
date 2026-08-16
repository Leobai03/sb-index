const { personas } = require('../../data/personas')

Page({
  data: {
    personas,
    activeCode: '',
  },

  togglePersona(event) {
    const code = event.currentTarget.dataset.code
    this.setData({ activeCode: this.data.activeCode === code ? '' : code })
  },

  startQuiz() {
    const seed = Date.now() ^ Math.floor(Math.random() * 2147483647)
    tt.setStorageSync('sbti_quiz_seed', seed)
    tt.removeStorageSync('sbti_answers')
    tt.navigateTo({ url: '/pages/quiz/quiz' })
  },

  onShareAppMessage() {
    return { title: '看看你会对账出什么抽象人格', path: '/pages/types/types' }
  },
})
