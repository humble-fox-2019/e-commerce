<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>BassLine</v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-toolbar-items>
        <v-btn text>
          <router-link to="/">Home</router-link>
        </v-btn>
        <v-btn active-class text>
          <router-link to="/shop">Shop</router-link>
        </v-btn>
      </v-toolbar-items>

      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-btn icon>
          <v-icon>mdi-cart</v-icon>
        </v-btn>

        <v-btn outlined v-if="!$store.state.login">
          <v-icon>mdi-login</v-icon>Login
        </v-btn>

        <v-menu offset-y v-if="$store.state.User.login">
          <template v-slot:activator="{on}">
            <v-btn outlined v-on="on" :class="{'mr-4': $store.state.admin}">
              <v-img :src="$store.getters.gravatar" width="20px" alt="profile image" class="mr-2"></v-img>
              {{$store.state.username}}
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu offset-y v-if="$store.state.User.admin">
          <template v-slot:activator="{on}">
            <v-btn outlined v-on="on">
              <v-icon>mdi-account-supervisor</v-icon>Admin
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="showCreateProduct">
              <v-list-item-title>Add New Product</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.isLogin = false;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
    },
    showCreateProduct() {}
  },
  created() {
    this.$store.dispatch("getProducts");
  }
};
</script>

<style>
</style>