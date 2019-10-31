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
  import movingColumnsAndTasksMixin from '../mixins/movingColumnsAndTasksMixin'

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

    },
    mixins: [movingColumnsAndTasksMixin],
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

    }
  }
</script>

<style scoped>

</style>
