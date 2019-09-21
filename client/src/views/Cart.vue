<template>
  <div class="container" style="margin-top: 80px">
    <h3>Shopping Cart</h3>
    <div class="cart mt-4 d-flex flex-column">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Subtotal</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <CartItem v-for="itemCart in cart" :key="itemCart._id" :itemCart="itemCart"></CartItem>
        </tbody>
      </table>
      <div class="checkout ">
        <table class="table">
          <tbody>
            <tr>
              <td>Total</td>
              <td>Rp {{ total }}</td>
            </tr>
          </tbody>
          <button>Checkout</button>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CartItem from '../components/CartItem'

export default {
    name: 'Cart',
    components: { CartItem },
    computed: {
      total() {
        let totalResult = 0
        this.cart.forEach(itemCart => {
          totalResult += itemCart.subtotal
        })
        return totalResult
      },
      ...mapState(['cart', 'toggleStatus'])
    }, 
    // computed: {
    //   cartItems() {
    //     return this.$store.state.cart
    //   }
    // },
    watch: {
      toggleStatus() {
        switch(this.toggleStatus){
          case 'delete_cart_success':
            this.$swal.mixin({
              toast: 'true',
              position: 'top',
              showConfirmButton: false,
              timer: 3000
            }).fire({
              type: 'success',
              title: 'Deleted from your cart!'
            })
            break;
        }
      }
    },
    created() {
      this.$store.dispatch('fetchCart')
    }
}
</script>

<style>

</style>