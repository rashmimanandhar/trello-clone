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
    moveTaskOrColumn (e, toColumnTasks, toColumnIndex, toTaskIndex) {
      const type = e.dataTransfer.getData('type')
      if (type === 'task') {
        this.moveTask(e, toColumnTasks, toTaskIndex !== undefined ? toTaskIndex : toColumnTasks.length)
      } else {
        this.moveColumn(e, toColumnIndex)
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
    moveColumn (e, toColumnIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex
      })
    },
  }
}
