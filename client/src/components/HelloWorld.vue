<template>
  <div class="hello">
    <h1>Do you like cats ?</h1>
    <p>We will give you the opportunity to vote for the cuttest cat !</p>
    <p>Be ready to start voting ! Don't forget to check the ranking !</p>
    <router-link to="/vote">Start voting !</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
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
a {
  background-color: #0099ff;
  color: white;
  border-radius: 1234px;
  padding: 2rem;
  margin: 3rem 0;
}
p {
  font-weight: bold;
  font-size: 2.0rem;
  letter-spacing: .2rem;
  margin-bottom: 1.5rem;
}

.hello {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
</style>
