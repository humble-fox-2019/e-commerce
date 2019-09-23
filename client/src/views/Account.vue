<template>
  <div>
    <Login @registerShow="showregister" v-if="isLogin"></Login>
    <Register @loginShow="showLogin" v-if="isRegister"></Register>
  </div>
</template>

<script>
import Register from "../components/Register";
import Login from "../components/Login";

export default {
  data: function() {
    return {
      isLogin: true,
      isRegister: false
    };
  },
  components: {
    Register,
    Login
  },
  methods: {
    showregister() {
      this.isLogin = false;
      this.isRegister = true;
    },
    showLogin() {
      this.isLogin = true;
      this.isRegister = false;
    }
  }
};
</script>

<style>
</style>