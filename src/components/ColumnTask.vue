<template>
  <AppDrop
    @drop="moveTaskOrColumn"
  >
    <AppDrag :transferData="{type:'task', fromColumnIndex: colIndex, fromTaskIndex: taskIndex}"
             @click="goToTask(task.id)"
             class="task"
    >
      <span class="w-full flex-no-shrink font-bold">
        {{task.name}}
      </span>
      <p class="w-full flex-no-shrink mt-1 text-sm" v-if="task.description">
        {{task.description}}
      </p>
    </AppDrag>
  </AppDrop>

</template>

<script>
  import movingColumnsAndTasksMixin from '../mixins/movingColumnsAndTasksMixin'
  import AppDrop from './AppDrop'
  import AppDrag from './AppDrag'

  export default {
    components: { AppDrag, AppDrop },
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
