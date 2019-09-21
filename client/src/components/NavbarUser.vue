<template>
  <div id="navbar">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <!-- GameStop brand -->
      <b-navbar-brand>
        <router-link to="/">
          <i class="fas fa-gamepad"></i> GameStop
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <!-- All the links -->
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/cart">
              <i class="fas fa-shopping-cart"></i> Cart
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/transaction">
              <i class="fas fa-wallet"></i> Transactions
            </router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- Logout button -->
          <b-nav-form>
            <b-nav-item id="register-nav">
              <router-link to="/register">Register</router-link>
            </b-nav-item>
            <b-nav-item id="login-nav">
              <router-link to="/login">Login</router-link>
            </b-nav-item>
            <b-nav-item id="logout-nav" @click.prevent="logout">Logout</b-nav-item>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      // if (gapi.auth2) {
      //   const auth2 = gapi.auth2.getAuthInstance();
      //   auth2.signOut().then(function() {
      //     console.log("User logged out successfuly.");
      //   });
      // }
      this.$swal.fire("Good job!", "You clicked the button!", "success");
      // if (localStorage.getItem("token")) {
      //   localStorage.removeItem("token");
      //   Swal.fire(
      //     "Successfully logged out",
      //     "Please clicked the button to continue!",
      //     "success"
      //   );
      // }
      // this.$emit("show-login-page");
    }
  }
};
</script>

<style scoped>
#navbar {
  top: 0px;
  z-index: 10;
  position: sticky;
}
</style>