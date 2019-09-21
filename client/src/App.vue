<template>
  <div id="app">
    <navbar />
    <router-view/>
  </div>
</template>
<script>
import navbar from './components/navbar'
export default {
  components: {
    navbar
  }
}
</script>
<style>
#app {
  /* font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  color: #2c3e50;
}

</style>
