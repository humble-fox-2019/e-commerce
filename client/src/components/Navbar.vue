<template>
  <div>
    <nav
      class="navbar-mine navbar navbar-expand-lg fixed-top navbar-light bg-light d-flex justify-content-center"
    >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item my-item-nav" v-if="isUser">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item my-item-nav" v-if="isUser">
            <router-link class="nav-link" to="/cart">Cart</router-link>
          </li>
           <li class="nav-item my-item-nav" v-if="checkAdmin">
            <router-link class="nav-link" to="/admin1">Admin Konfirm</router-link>
          </li>
          <li class="nav-item my-item-nav" v-if="checkAdmin">
            <router-link class="nav-link" to="/admin2">Product Crud</router-link>
          </li>
          <li class="nav-item my-item-nav" v-if="isUser" >
            <router-link class="nav-link" to="/transaksiuser">Histori Transaksi</router-link>
          </li>
         </ul>
      </div>
      <div>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav">
            <li class="nav-item my-item-nav" v-if="!isUser && !checkAdmin">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item my-item-nav" v-if="isUser || checkAdmin">
              <a class="nav-link" tabindex="-1" aria-disabled="true" @click="LogOut" style="cursor : alias;">LogOut</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  methods: {
    LogOut() {
      localStorage.clear();
      this.$store.commit('LOGOUT' , '')
      this.$router.push({ path: "/login" });
    }
  },
  computed :{
    ...mapState(['checkAdmin','isUser']),
  },
  data (){
    return {
      statusAdmin : localStorage.getItem('admin'),
      storage : localStorage.getItem('token')
    }
  },
  created (){
    // if(this.checkAdmin){
    //   console.log('DI CREATED NAVBAR' ,  localStorage.getItem('admin'))
    //   this.$store.commit('ADMIN' , '')
    // }else if(this.isUser){
    //   this.$store.commit('ISUSER' , '')
    // }
  }
};
</script>

<style scoped>
/* .navbar-mine { */
  /* background-color:  #1c1e21 !important;  */
  /* height: 100px; */
/* } */
.my-item-nav a {
  color: black !important;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 100px;
  font-size: 19px;
}
</style>