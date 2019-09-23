<template>
  <div class="row">
    <div class="col-md-12 d-flex align-items-stretch justify-content-between">
      <button @click="$router.push('/cart')" class="btn btn-primary btn-sm">
        Cart
        <i class="fa fa-shopping-cart ml-2"></i>
      </button>
      <a @click.prevent="$router.push('/home/list')" href="/home">
        <img class="img-logo-home" src="@/assets/logo.png" alt />
      </a>
      <button v-if=" token !== '' " @click="logout" class="btn btn-primary btn-sm">
        Logout
        <i class="fa fa-sign-out ml-2"></i>
      </button>
      <button v-else @click="login" class="btn btn-primary btn-sm">
        Login
        <i class="fa fa-sign-in ml-2"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "navbar",
  computed: {
    ...mapState(["token", "isAdmin"])
  },
  methods: {
    ...mapMutations(["removeToken"]),
    logout() {
      this.removeToken();
      this.$router.push("/");
    },
    login() {
      this.$router.push("/login");
    }
  }
};
</script>

<style>
</style>