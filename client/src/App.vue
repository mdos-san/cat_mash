<template>
  <div id="app">
    <header>
      <span class="brand">
        <router-link class="m0" to="/">
          <h1>Cat Mash</h1>
        </router-link>
      </span><span class="nav">
        <router-link to="/vote">Vote</router-link>
        <router-link to="/ranking">Ranking</router-link>
      </span>
    </header>
    <main>
      <router-view></router-view>
    </main>
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
  padding: 5rem;
  height: 100%;
  max-height: 100%;
  width: 100%;
  max-width: 100%;
  display: table;
}

#app > * {
  display: table-row;
}

h1 {
  display: inline-block;
}

a {
  display: inline-block;
  text-decoration: none;
  color: white;
  font-weight: bold;
  letter-spacing: .2rem;
  margin-left: 2rem;
  transition: 1s all;
}
a:hover { color: #0099ff; }
a:visited { color: white; }
a:visited:hover { color: #0099ff; }

span {
  display: inline-block;
}

.brand { width: 40%; }
.nav {
  width: 60%;
  text-align: right;
}

main {
  height: 100%;
  overflow-y: auto;
}


</style>
