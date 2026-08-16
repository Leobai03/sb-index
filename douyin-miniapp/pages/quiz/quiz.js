const { questions } = require('../../data/questions')
const { createQuestionOrder } = require('../../utils/questionOrder')

Page({
  data: {
    question: null,
    options: [],
    current: 0,
    total: questions.length,
    progress: 0,
    selectedId: '',
  },

  onLoad() {
    const seed = tt.getStorageSync('sbti_quiz_seed') || Date.now()
    this.orderedQuestions = createQuestionOrder(questions, seed)
    this.answers = tt.getStorageSync('sbti_answers') || {}
    this.showQuestion(0)
  },

  showQuestion(index) {
    const question = this.orderedQuestions[index]
    const labels = ['A', 'B', 'C']
    this.setData({
      question,
      options: question.options.map((option, optionIndex) => Object.assign({}, option, { label: labels[optionIndex] })),
      current: index,
      progress: Math.round((index / this.orderedQuestions.length) * 100),
      selectedId: '',
    })
  },

  chooseOption(event) {
    if (this.data.selectedId) return
    const optionId = event.currentTarget.dataset.id
    this.answers[this.data.question.id] = optionId
    tt.setStorageSync('sbti_answers', this.answers)
    this.setData({ selectedId: optionId })

    setTimeout(() => {
      const nextIndex = this.data.current + 1
      if (nextIndex >= this.orderedQuestions.length) {
        tt.redirectTo({ url: '/pages/result/result?fresh=1' })
        return
      }
      this.showQuestion(nextIndex)
    }, 160)
  },

  goBack() {
    if (this.data.current === 0) {
      tt.navigateBack()
      return
    }
    this.showQuestion(this.data.current - 1)
  },
})
