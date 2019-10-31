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
      console.log(transferData);
      if (transferData.type === 'task') {
        this.moveTask(transferData)
      } else {
        this.moveColumn(transferData)
      }
    },
    moveTask ({fromColumnIndex, fromTaskIndex, toTaskIndex}) {
      const fromColumnTasks = this.board.columns[fromColumnIndex].tasks
      this.$store.commit('MOVE_TASK', {
        fromColumnTasks,
        fromTaskIndex,
        toColumnTasks: this.column.tasks,
        toTaskIndex: this.taskIndex
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
