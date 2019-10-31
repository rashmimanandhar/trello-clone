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
      <ColumnTask
        :colIndex="colIndex"
        :column="column"
        :key="taskIndex"
        :task="task"
        :taskIndex="taskIndex"
        :board="board"
        v-for="(task, taskIndex) of column.tasks"></ColumnTask>
      <input @keyup.enter="createTask($event, column.tasks)" class="block p-2 w-full bg-transparent"
             placeholder="+ Enter new task"
             type="text"/>
    </div>

  </div>
</template>

<script>

  import ColumnTask from './ColumnTask'
  import movingColumnsAndTasksMixin from '../mixins/movingColumnsAndTasksMixin'

  export default {
    components: { ColumnTask },
    mixins:[movingColumnsAndTasksMixin],
    computed: {
      name () {
        return this.data
      },
    },
    methods: {
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
