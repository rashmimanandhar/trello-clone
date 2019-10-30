<template>
  <div
    @dragenter.prevent
    @dragover.prevent
    @dragstart.self="pickUpColumn($event, colIndex)"
    @drop="moveTaskOrColumn($event, column.tasks, colIndex)"
    class="column"
    draggable="true"
  >
    <div class="flex items-center mb-2 font-bold">
      {{column.name}}
    </div>
    <div class="list-reset">
      <div :key="taskIndex"
           @click="goToTask(task.id)"
           @dragenter.prevent
           @dragover.prevent
           @dragstart="pickupTask($event, taskIndex, colIndex)"
           @drop.stop="moveTaskOrColumn($event, column.tasks, colIndex, taskIndex)"
           class="task"
           draggable="true"
           v-for="(task, taskIndex) of column.tasks">
            <span class="w-full flex-no-shrink font-bold">
              {{task.name}}
            </span>
        <p class="w-full flex-no-shrink mt-1 text-sm" v-if="task.description">
          {{task.description}}
        </p>
      </div>
      <input @keyup.enter="createTask($event, column.tasks)" class="block p-2 w-full bg-transparent"
             placeholder="+ Enter new task"
             type="text"/>
    </div>

  </div>
</template>

<script>

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
    computed: {
      name () {
        return this.data
      },
    },
    methods: {
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
      pickUpColumn (e, fromColIndex) {
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.dropEffect = 'move'

        //dataTransfer only allows to pass string
        e.dataTransfer.setData('from-column-index', fromColIndex)
        e.dataTransfer.setData('type', 'column')
      },
      createTask (e, tasks) {
        this.$store.commit('CREATE_TASK', {
          tasks,
          name: e.target.value
        })
        e.target.value = ''
      },
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
      }
    }
  }
</script>

<style lang="css">
  .column {
    @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
    min-width: 350px;
  }

</style>
