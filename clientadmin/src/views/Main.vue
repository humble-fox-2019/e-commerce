<template>
  <div class="main">
    <div class="shadow">
      <router-link class="btn" to="/dogs">Dog</router-link>
      <router-link class="btn" to="/add">Add New</router-link>
      <router-link class="btn" to="/transaction">transaction</router-link>
      <button class="btn" @click.prevent="logout()">Logout</button>
    </div>
    <div class="mt-5">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    logout(){
      localStorage.clear();
      this.$emit('logout');
    }
  }
};
</script>

<style scoped>
.btn:hover {
  color: grey;
  transition: 0.7s all;
}
.btn {
  color: black;
  transition: 0.7s all;
  font-size: 24px;
}
</style>