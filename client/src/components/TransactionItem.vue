<template>
   <tr>
    <td>
      {{ transaction._id }}
    </td>
    <td>
      <ul>
        <li v-for="product in transaction.products" :key="product._id">
          {{ product.ProductId.name }}
        </li>
      </ul>
    </td>
    <td> 
      Rp {{ transaction.total }}
    </td>
    <td>
      {{ transaction.status }}
    </td>
    <td> 
      <a href="" v-if="transaction.status == 'pending'" @click.prevent="pay">Pay</a>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'TransactionItem',
  props: ['transaction'],
  methods: {
    pay () {
      this.$swal.fire({
        title: 'Are you sure want to pay?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, pay it!'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('pay', this.transaction._id)
        }
      })
    }
  }
}
</script>

<style>

</style>