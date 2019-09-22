<template>
    <div class="navbar flex justify-between items-center bg-white">

        <div class="left flex flex-row">
            <div>
                <router-link to="/nike">Nike</router-link>
            </div>
            <div>
                <router-link to="/adidas">Adidas</router-link>
            </div>
            <div>
                <router-link to="/newbalance">New Balance</router-link>
            </div>
        </div>
        <div>
            <router-link to="/"  class="text-3xl"><h1>WoodPecker</h1></router-link>
        </div>
        <div class="right flex flex-row">
            <div v-if="this.$store.state.status === 'admin'">
                <router-link to="/admin">Admin</router-link>
            </div>
            <div>
                <a v-if="this.$store.state.status" style="text-decoration: none; color: black;" href="" @click.prevent="logout">Logout</a>
                <router-link v-else to="/login">Login</router-link>
            </div>
            <div>
                <router-link to="/cart"><p>Shopping Cart</p></router-link>
            </div>
        </div>

    </div>
</template>

<script>

export default {
  data: function () {
    return {
    }
  },
  methods: {
      logout(){
          localStorage.removeItem('token')
          this.$store.commit('changeStatus', null)
          this.$router.push('/')
      }
  },
  created(){
      if(localStorage.getItem('token')){
          this.$store.commit('changeStatus', true)
      }else {
          this.$store.commit('changeStatus', false)
      }
  }
}
</script>

<style scoped>
    .box {
        height: 50%;
        width: 100vw;
    }
    input{
        outline: none;
    }
    .navbar {
        position: sticky;
        z-index: 2;
        top: 0px;
        height: 8vh;
        border-bottom: 1px solid black;
    }
    .left div{
        padding-left: 2rem;
    }
    .right div {
        padding-right: 2rem;
    }
</style>
