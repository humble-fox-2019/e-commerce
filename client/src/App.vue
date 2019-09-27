<template>
  <div id="app">
    <Navbar :token="token" :buyItem="buyItem"></Navbar>
    <div class="content">
      <router-view @newToken="getToken" @toCart="toCart" />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  data () {
    return {
      message: 'hei',
      token: '',
      buyItem: false
    }
  },
  components: {
    Navbar
  },
  methods: {
    getToken () {
      this.token = localStorage.token
      this.$router.push({ path: `/products` })
    },
    toCart (input) {
      this.buyItem = input
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.content {
  margin-top: 145px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
Navbar {
  position: sticky;
}
</style>
