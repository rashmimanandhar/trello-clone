<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <BoardColumn
        v-for="(column, colIndex) of board.columns"
        :key="colIndex"
        :column = "column"
        :colIndex = "colIndex"
        :board="board"
      />
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
  import BoardColumn from '../components/BoardColumn'

  export default {
    components:{BoardColumn},
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
      close () {
        this.$router.push({ name: 'board' })
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


  .board {
    @apply p-4 bg-teal-dark h-full overflow-auto;
  }

  .task-bg {
    @apply pin absolute;
    background: rgba(0, 0, 0, 0.5);
  }
</style>
