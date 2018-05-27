<template>
  <div class="vote">
      <h1>Vote</h1>
  </div>
</template>

<script>
export default {
  name: 'Vote',
  created: async function () {
    const response = await fetch('http://localhost:8081/pair')
    console.log('Pair', response)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
