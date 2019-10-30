<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow justify-between px-4">
      <input :value="task.name" @change="updateTask($event, 'name')" class="p-2 w-full mr-2 flex-grow text-xl font-bold"
             type="text">

      <textarea :value="task.description"
                @change="updateTask($event, 'description')"
                class="relative w-full bg-transparent px-2 border mt-2 h-64 border-none leading-normal"></textarea>

    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['getTask']),
      task () {
        return this.getTask(this.$route.params.id)
      }
    },
    methods: {
      updateTask(e, key){
        this.$store.commit('UPDATE_TASK', {
          task: this.task,
          key,
          value: e.target.value
        })
      }
    }
  }
</script>

<style>
  .task-view {
    @apply relative flex flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
    max-width: 700px;
  }
</style>
