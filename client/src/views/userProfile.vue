<template>
<div class="container mt-4">
  <center>
  </center>
  <div class="row justify-content-md-center">
  <div class="ml-4">
    <router-link to="/userProfile/transactionHistory">
    <button class="btn btn-secondary">Transaction History</button>
    </router-link>
  </div>
</div>
<router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'userProfile',
  data () {
    return {

    }
  },
  methods: {
    // goToTransactionPage(){
    //   this.$router.push({ path: "userProfile/transactionHistory" })
    // }
  }

}
</script>

<style>

</style>
