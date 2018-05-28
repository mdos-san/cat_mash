<template>
  <div class="ranking">
      <h1>Ranking</h1>
        <div class="card" v-for="rank in ranks" v-bind:key="rank.id">
          <div class="card__img">
            <img :src="rank.url"/>
          </div>
          <div class="card__body">
            <span>{{rank.votes}} Vote{{rank.votes > 1 ? 's' : '' }}</span>
          </div>
        </div>
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
      const response = await fetch(process.env.ROOT_API + '/ranking')
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
  width: 100%;
}

tr {
  height: 100px;
}

h1 {
  font-weight: bold;
  margin: 6rem 0 3rem;
}

table {
  width: 100%;
  height: 100%;
  overflow: auto;
  text-align: center;
}

.ranking {
  text-align: center;
}

.card {
  margin: 0 auto;
  width: 300px;
  margin-bottom: 3rem;
}

.card__img img {
  display: block;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.card__body {
  color: #555555;
  background-color: white;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 1rem;
}

</style>
