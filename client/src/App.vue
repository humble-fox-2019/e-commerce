<template>
  <div id="app">
    <Navbar></Navbar>

    <router-view/>
  </div>
</template>
<script>
import Navbar from '../src/components/Navbar'
export default {
  components:{
    Navbar
  }
  
}
</script>
<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

</style>
