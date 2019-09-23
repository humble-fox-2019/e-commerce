<template>
  <div id="app">
    <NavBar ></NavBar>
    <router-view/>
  </div>
</template>

<style>

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

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import NavBar from './components/Navbar';
export default {
  components : {
    NavBar,
  },
  data : {
    local : null
  },
  created(){
    // console.log(this.$store.state.message , ' ini')
    // this.data = this.$store.state.message;
    // this.local = localStorage.getItem('token');
    this.$store.dispatch('checkAdminOrUser')
  },
  computed : {
    message () {
      return $store.state.message
    }
  }
} 
</script>
