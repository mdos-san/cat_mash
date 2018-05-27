<template>
  <div class="vote">
      <h1>Vote</h1>
      <div v-for="cat in cats" :key="cat.id">
        <img :src="cat.url" v-on:click="vote(cat.id)"/>
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
    this.getData()
  },
  methods: {
    vote: async function (id) {
      let id0 = this.cats[0].id
      let id1 = this.cats[1].id
      let vote = id

      const response = await fetch('http://localhost:8081/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id0: id0, id1: id1, vote: vote})
      })
      const json = await response.json()
      if (json.success) {
        this.getData()
      }
    },
    getData: async function () {
      const response = await fetch('http://localhost:8081/pair')
      const json = await response.json()
      this.cats = json
    }
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
