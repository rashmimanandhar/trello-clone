export default {
  props: {
    column: {
      type: Object,
      required: true
    },
    colIndex: {
      type: Number,
      required: true
    },
    board: {
      type: Object,
      required: true
    }
  },
  methods:{
    moveTaskOrColumn (transferData) {
      if (transferData.type === 'task') {
        this.moveTask(transferData)
      } else {
        this.moveColumn(transferData)
      }
    },
    moveTask (e, toColumnTasks, toTaskIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      const fromColumnTasks = this.board.columns[fromColumnIndex].tasks
      const fromTaskIndex = e.dataTransfer.getData('from-task-index')
      this.$store.commit('MOVE_TASK', {
        fromColumnTasks,
        toColumnTasks,
        fromTaskIndex,
        toTaskIndex
      })
    },
    moveColumn ({fromColumnIndex}) {
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex: this.colIndex
      })
    },
  }
}
