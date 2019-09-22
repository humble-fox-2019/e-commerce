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
  color: #2c3e50;
}

</style>
