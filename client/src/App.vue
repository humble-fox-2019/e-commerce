<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/products" v-show="this.$store.state.isLoggedIn">Products</router-link> 
      <a v-show="this.$store.state.isLoggedIn"> | </a>
      <router-link to="/shopping-cart" v-show="this.$store.state.isLoggedIn">Shopping Cart</router-link>
      <a v-show="this.$store.state.isLoggedIn"> | </a>
      <router-link to="/about">About</router-link> 
      <a v-show="!this.$store.state.isLoggedIn"> | </a>
      <router-link to="/register" v-show="!this.$store.state.isLoggedIn">Register</router-link>
      <a v-show="!this.$store.state.isLoggedIn"> | </a>
      <router-link to="/login" v-show="!this.$store.state.isLoggedIn">Log In</router-link> 
      <a v-show="this.$store.state.isLoggedIn"> | </a>
      <a href="" @click.prevent="logout" v-show="this.$store.state.isLoggedIn">Log out</a>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
    data : function () {
      return {
        isLoggedIn : false
      }
    },
    methods : {
      logout : function () {
        console.log('wow')
        this.$store.dispatch('logout')
      }
    }
}
</script>
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
