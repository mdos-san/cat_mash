<template>
  <div class="vote">
      <h1>Vote</h1>
      <div v-for="cat in cats" :key="cat.id">
        <img :src="cat.url"/>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Vote',
  data: () => {
    return {
      cats: []
    }
  },
  created: async function () {
    const response = await fetch('http://localhost:8081/pair')
    const json = await response.json()
    this.cats = json
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  max-width: 100%;
}

div {
  width: 50%;
  display: inline-block;
}
</style>
