<template>
  <nav>
    <v-toolbar color="teal" dark>
      <v-toolbar-title>TiveStore</v-toolbar-title>

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

      <v-app-bar-nav-icon></v-app-bar-nav-icon>
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

<style>
</style>