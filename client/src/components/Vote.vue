<template>
  <div class="vote">
      <h1>Click on the cutest cat !</h1>
      <table>
        <tr>
          <td v-for="cat in cats" :key="cat.id">
            <img :src="cat.link" v-on:click="vote(cat.id)"/>
          </td>
        </tr>
      </table>
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

      const response = await fetch(process.env.ROOT_API + '/vote', {
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
      const response = await fetch(process.env.ROOT_API + '/vote')
      const json = await response.json()
      this.cats = json
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: bold;
  margin: 6rem 0 3rem;
}

img {
  max-width: 300px;
  max-height: 300px;
  border-radius: 4px;
  transition: .1s all;
}
img:hover {
  cursor: pointer;
  transform: scale(1.1);
}

span {
  width: 50%;
  display: inline-block;
}

div { text-align: center; }

table {width: 100%;}
td {width: 50%;}
</style>
