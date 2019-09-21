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

        <v-btn text route to='/cart'>
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
        <v-list-item route to='/login'>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
        <v-list-item route to='/registration'>
          <v-list-item-title>Registration</v-list-item-title>
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
  }
};
</script>

<style scoped>
.title {
  color: white;
  text-decoration: none;
}
</style>