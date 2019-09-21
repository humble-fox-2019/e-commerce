<template>
  <div id="app">
    <div>
      <Navbar ></Navbar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  components: {
    Navbar
  },
  data () {
    return {
      auth: null
    }
  },
  mounted() {
    let token = localStorage.getItem('token')
    let payload = {
      name : localStorage.getItem('name'),
      email : localStorage.getItem('email'),
      role : localStorage.getItem('role')
    }
    if (token) {
      this.$store.state.auth = {
        token, payload
       }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Quicksand:400,500,700&display=swap');
#app {
  font-family: 'Quicksand', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 100%; 
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
