<template>
  <div
    draggable="true"
    @dragstart="onDrag"
    @dragenter.prevent
    @dragover.prevent
  >
  <slot/>
  </div>
</template>

<script>
  export default {
    props: {
      transferData: {
        type: Object,
        required: true
      },
    },
    methods: {
      onDrag(e){
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.dropEffect = 'move'
        e.dataTransfer.setData('payload', JSON.stringify(this.transferData))
      }
    }
  }
</script>

<style scoped>

</style>
