<template>
  <div class="container">
    <h3>Transactions</h3>
    <div class="cart mt-4 d-flex flex-column">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Products</th>
            <th scope="col">Total</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <TransactionItem v-for="transaction in transactions" :key="transaction._id" :transaction="transaction"></TransactionItem>
        </tbody>
      </table>
      
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TransactionItem from '../components/TransactionItem'

export default {
  name: 'Transactions',
  components: { TransactionItem },
  computed: mapState(['transactions', 'toggleStatus']), 
  created() {
    this.$store.dispatch('fetchTransactions')
  },
  watch: {
    'toggleStatus.message'() {
      switch (this.toggleStatus.type) {
        case 'pay_success':
          this.$swal.mixin({
              toast: 'true',
              position: 'center',
              showConfirmButton: false,
              timer: 3000
            }).fire({
              type: 'success',
              title: this.toggleStatus.message
            })
          break;
        case 'pay_failed':
          this.$swal.mixin({
              toast: 'true',
              position: 'center',
              showConfirmButton: false,
              timer: 3000
            }).fire({
              type: 'error',
              title: this.toggleStatus.message
            })
          break;
        case 'not_authenticated':
            this.$swal.mixin({
              position: 'center',
              showConfirmButton: false,
              timer: 3000
            }).fire({
              type: 'error',
              title: this.toggleStatus.message
            })
            this.$router.push('/auth/signin')
            break;
      }
    }
  },
  mounted() {
    this.$store.dispatch('fetchTransactions')
  }
}
</script>

<style scoped>
  .container {
    padding-top: 80px;
  }
</style>