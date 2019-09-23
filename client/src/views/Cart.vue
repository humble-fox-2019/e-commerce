<template>
<div>
<navbar></navbar>
  <div class="container">
    <div class="row mt-5">
      <div class="col col-md-8">
        <h2 class="text-center mb-4">Your Carts</h2>
        <cartlist></cartlist>
      </div>
      <div class="col col-md-4">
          <center>
        <button class="btn btn-info mt-4" @click="goToProfilePage">Go to Profile Page</button>
          </center>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import cartlist from '../components/cartlist.vue'
import navbar from "../components/navbar";
export default {
  name: 'cart',
  components: {
    cartlist,
    navbar
  },
  data () {
    return {}
  },
  methods: {
      goToProfilePage(){
          this.$router.push({ path: '/userProfile' })
      }

  },
  mounted () {
    this.$store.dispatch('getAllCarts')
  }
}
</script>

<style scoped>
navbar{
    width: 100%
}
</style>
