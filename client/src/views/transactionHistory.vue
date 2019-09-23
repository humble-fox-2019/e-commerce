<template>
<div class="container">
  <h2 class="text-center mt-4 mb-4">Transaction History</h2>
  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Product</th>
      <th scope="col">Quantity</th>
      <th scope="col">Price</th>
      <th scope="col">Total Price</th>
      <th scope='col'>Date</th>
      <th scope='col'>Arrived Status</th>
      <th scope='col'>Option</th>
    </tr>
  </thead>
  <!-- {{userTransactions[0].CartId[0].productId.price}} -->
  <tbody>
    <tr v-for="(transaction,index) in userTransactions" :key="index">
      <th scope="row">{{index+1}}</th>
      <td v-for="(cart,index) in transaction.CartId" :key="index">{{cart.productName}}</td>
      <td v-for="(cart,index) in transaction.CartId" :key="index">{{cart.quantity}}</td>
      <td v-for="(cart,index) in transaction.CartId" :key="index">{{changeFormat(cart.productId.price)}}</td>
      <td>{{changeFormat(transaction.total_price)}}</td>
      <td>{{convertDate(transaction.createdAt)}}</td> 
      <td>{{transaction.arrived_status}}</td>
      <td><button @click="receiveProduct(transaction._id)" class="btn btn-success">Arrived</button></td> 
    </tr>
  </tbody>
</table>

</div>

</template>

<script>
import Vue from 'vue'
export default {
  name: 'transactionHistoryPage',
  data () {
    return {

    }
  },
  methods: {
      receiveProduct(id) {
      console.log("masuk ke receiveProduct")
      Vue.swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, I already got this product!"
        })
        .then(result => {
            this.$store.dispatch("updateTransaction", id);
        });
    },
     changeFormat(price) {
      return `Rp. ${Number(price).toLocaleString("id-IDR")},-`;
    },
    convertDate (date) {
      return new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    }
  },
  computed: {
    userTransactions () {
      return this.$store.state.userTransactions
    }
  },
  mounted () {
    this.$store.dispatch('getAllUserTransactions')
  }

}
</script>

<style>

</style>
