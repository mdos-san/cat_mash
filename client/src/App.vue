<template>
  <div id="app">
    <h1>Cat Mash</h1>
    <router-link to="/vote">Vote</router-link>
    <router-link to="/ranking">Ranking</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
