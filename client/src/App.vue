<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/shop">Shop</router-link>
      <router-link to="/user">Account</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #efefef;
  height: 100vh;
}
#nav {
  position: fixed;
  width: 100vw;
  padding: 30px;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  border-bottom: 1px solid #000;
}
</style>
