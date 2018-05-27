<template>
  <div class="ranking">
      <h1>Ranking</h1>
      <table>
        <tr v-for="rank in ranks" v-bind:key="rank.id">
          <td>
            <img :src="rank.url" />
          </td>
          <td>
            <span>{{rank.votes}} Vote{{rank.votes > 1 ? 's' : '' }}</span>
          </td>
        </tr>
      </table>
  </div>
</template>

<script>
export default {
  name: 'Ranking',
  data: () => {
    return {
      ranks: []
    }
  },
  methods: {
    async getRanks () {
      const response = await fetch('http://localhost:8081/ranking')
      const json = await response.json()
      this.ranks = json
    }
  },
  created: async function () {
    this.getRanks()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  max-height: 100px;
  max-width: 100px;
}

tr {
  height: 100px;
}

</style>
