<template>
  <div
    @click="goToTask(task.id)"
    @dragenter.prevent
    @dragover.prevent
    @dragstart="pickupTask($event, taskIndex, colIndex)"
    @drop.stop="moveTaskOrColumn($event, column.tasks, colIndex, taskIndex)"
    class="task"
    draggable="true"
  >
            <span class="w-full flex-no-shrink font-bold">
              {{task.name}}
            </span>
    <p class="w-full flex-no-shrink mt-1 text-sm" v-if="task.description">
      {{task.description}}
    </p>
  </div>
</template>

<script>
  export default {
    props: {
      task: {
        type: Object,
        required: true
      },
      taskIndex: {
        type: Number,
        required: true
      },
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
    methods: {
      pickupTask (e, taskIndex, fromColumnIndex) {
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.dropEffect = 'move'

        //dataTransfer only allows to pass string
        e.dataTransfer.setData('from-task-index', taskIndex)
        e.dataTransfer.setData('from-column-index', fromColumnIndex)
        e.dataTransfer.setData('type', 'task')
      },
      goToTask (task) {
        console.log(task)
        this.$router.push({ name: 'task', params: { id: task } })
      },
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
</script>

<style scoped>

</style>
