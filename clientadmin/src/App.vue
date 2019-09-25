<template>
  <div id="app">
    <Sign v-if="!isLogin" @login="login()"></Sign>
    <Main v-if="isLogin" @logout="logout()"></Main>
  </div>
</template>
<script>
import Sign from "./views/Sign";
import Main from "./views/Main";
export default {
  data() {
    return {
      isLogin: false
    };
  },
  methods: {
    login() {
      this.isLogin = true;
    },
    logout(){
      this.isLogin = false;
    }
  },
  components: {
    Sign,
    Main
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isLogin = true;
      this.$router.push("/dogs");
    } else {
      this.$router.push("/");
    }
  }
};
</script>
<style>
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
</style>
