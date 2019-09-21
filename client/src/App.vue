<template>
  <v-app class="grey lighten-4">
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  created(){
    if(localStorage.getItem('token')) {
      this.$store.commit('setToken', localStorage.getItem('token'));
      this.$store.commit('setUserData', localStorage.getItem('userData')); 
    }
  }
};
</script>
