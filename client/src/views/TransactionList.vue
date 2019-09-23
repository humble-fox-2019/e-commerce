<template>
  <div class="container mt-5 pb-5 shadow">
      <h1 class="pt-3">Transaction List</h1>
      <div v-if="this.$store.state.transactions.length == 0 "><i>No transaction</i></div>
      <div v-for="transaction in this.$store.state.transactions" :key="transaction._id">
        <Transaction :transaction='transaction'></Transaction>
        <hr>
      </div>
  </div>
</template>

<script>
import Transaction from '../components/Transaction'
export default {
    name : "TransactionList",
    components: {
        Transaction
    },
    methods : {
        fetchTransaction() {
            if ( this.$store.state.role == 'admin' )
                this.$store.dispatch('fetchTransactions')
            else if( this.$store.state.role == 'customer' ) {
                this.$store.dispatch('fetchCustomerTransactions')
            }
        }
    },  
    created () {
        this.fetchTransaction();
    }
}
</script>

<style>

</style>