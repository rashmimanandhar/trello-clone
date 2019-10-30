<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div :key="colIndex"
           @dragenter.prevent
           @dragover.prevent
           @dragstart.self="pickUpColumn($event, colIndex)"
           @drop="moveTaskOrColumn($event, column.tasks, colIndex)"
           class="column"
           draggable="true"
           v-for="(column, colIndex) of board.columns"
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
      <div class="column flex">
        <input type="text" v-model="newColumnName" class="p-2 mr-2 flex-grow" placeholder="Enter a new column name"  @keyup.enter="createColumn">
      </div>
    </div>

    <div @click.self="close" class="task-bg" v-if="isTaskOpen">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        newColumnName: ''
      }
    },
    computed: {
      isTaskOpen () {
        return this.$route.name === 'task'
      },
      ...mapState(['board'])
    },
    methods: {
      goToTask (task) {
        console.log(task)
        this.$router.push({ name: 'task', params: { id: task } })
      },
      close () {
        this.$router.push({ name: 'board' })
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
      createColumn(){
        this.$store.commit('CREATE_COLUMN', {
          name: this.newColumnName
        })
        this.newColumnName = ''
      }
    }
  }
</script>

<style lang="css">
  .task {
    @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
  }

  .column {
    @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
    min-width: 350px;
  }

  .board {
    @apply p-4 bg-teal-dark h-full overflow-auto;
  }

  .task-bg {
    @apply pin absolute;
    background: rgba(0, 0, 0, 0.5);
  }
</style>
