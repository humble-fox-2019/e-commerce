<template>
  <nav>
    <v-toolbar color="teal" dark>
      <router-link to="/" class="title">
        <v-toolbar-title>TiveStore</v-toolbar-title>
      </router-link>

      <div class="flex-grow-1"></div>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text route to='/'>
            <v-icon left>mdi-home</v-icon>
            <span>Home</span>
        </v-btn>

        <v-divider inset vertical></v-divider>

        <v-btn text route to='/cart' v-if="cekToken">
            <v-icon left>mdi-basket</v-icon>
            <span>Cart</span>
        </v-btn>
        
        <v-divider inset vertical></v-divider>
      </v-toolbar-items>
  
  <v-menu>
      <template v-slot:activator="{ on }">
      <v-app-bar-nav-icon v-on="on"></v-app-bar-nav-icon>
      </template>

      <v-list>
        <v-list-item route to='/products' v-if="cekRule.role === 'admin'">
          <v-list-item-title>Products</v-list-item-title>
        </v-list-item>
        <v-list-item route to='/login' v-if="!cekToken">
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
        <v-list-item route to='/registration' v-if="!cekToken">
          <v-list-item-title>Registration</v-list-item-title>
        </v-list-item>
        
        <v-list-item route to='/dashboard' v-if="cekRule === 'admin'">
          <v-list-item-title>dashboard</v-list-item-title>
        </v-list-item>
        
        <v-list-item v-if="cekToken" @click="logout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
      
    </v-toolbar>
    
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    cekToken() {
      return this.$store.state.token
    },
    cekRule() {
        return this.$store.state.userData
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$store.commit('setToken', '');
      this.$store.commit('setUserData', {});
    
      this.$router.push('login');
    }
  }
};
</script>

<style scoped>
.title {
  color: white;
  text-decoration: none;
}
</style>