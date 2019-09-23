<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import Navbar from "./components/Navbar.vue";
import SignForm from "./components/SignForm.vue";
export default {
  data() {
    return {
      isLogin: false
    };
  },
  components: {
    Navbar,
    SignForm
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$router.push("/home");
    } else {
      this.$router.push("/");
    }
  }
};
</script>
<style>
img {
  /* width: 100vh; */
  max-height: 100vh;
  object-fit: cover;
}
.testing {
  height: 100vh;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
#app {
  min-height: 100vh;
  background-color: #262626;
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
</style>
