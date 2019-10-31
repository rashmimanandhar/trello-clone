<template>
  <AppDrop
    @drop="moveTaskOrColumn"
  >
    <AppDrag :transferData="{type:'column', fromColumnIndex: colIndex}"
             class="column"
    >
      <div class="flex items-center mb-2 font-bold">
        {{column.name}}
      </div>
      <div class="list-reset">
        <ColumnTask
          :board="board"
          :colIndex="colIndex"
          :column="column"
          :key="taskIndex"
          :task="task"
          :taskIndex="taskIndex"
          v-for="(task, taskIndex) of column.tasks"></ColumnTask>
        <input @keyup.enter="createTask($event, column.tasks)" class="block p-2 w-full bg-transparent"
               placeholder="+ Enter new task"
               type="text"/>
      </div>

    </AppDrag>
  </AppDrop>
</template>

<script>

  import ColumnTask from './ColumnTask'
  import movingColumnsAndTasksMixin from '../mixins/movingColumnsAndTasksMixin'
  import AppDrop from './AppDrop'
  import AppDrag from './AppDrag'

  export default {
    components: { ColumnTask, AppDrag, AppDrop },
    mixins: [movingColumnsAndTasksMixin],
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
