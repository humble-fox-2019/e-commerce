<template>
  <div class="w-full">
    <div class="mt-10 mx-64">
      <h1 class="text-4xl font-bold mb-4 border-b-2 border-black">Checkout</h1>
      <div>
        <div class="flex">
          <h2 class="w-2/3 text-2xl font-bold">Items</h2>
          <h2 class="w-1/3 text-2xl font-bold ml-auto">Subtotal</h2>
        </div>
        <Cart v-for="item in cart.items" :key="item.productId._id" :item="item" :onProgress="cart.onProgress"> </Cart>
      </div>
    </div>

    <div class="mt-6 mx-64 mb-4">
      <h2 class="text-2xl font-bold">Invoice</h2>
      <p class="text-lg mt-2">
        Total: <span class="underline">{{ totalPriceState }}</span>
      </p>
    </div>

    <div class="mx-64 flex justify-around" v-if="!cart.onProgress">
      <button
      @click="submitCart"
        class="hover:bg-black text-black font-semibold hover:text-white py-2 px-8 border border-black hover:border-transparent rounded mt-2 focus:outline-none"
      >
        Confirm
      </button>
      <button
        @click="deleteCart"
        class="hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-6 border border-red-500 hover:border-transparent rounded mt-2 focus:outline-none"
      >
        Delete Cart
      </button>
    </div>
    <div v-else class="flex justify-center">
      <p class="text-sm">Order already submitted to Admin. We will confirm it shortly!</p>
    </div>
  </div>
</template>

<script>
import Cart from '../components/Cart'

export default {
  name: 'carts',
  components: {
    Cart
  },
  created() {
    this.$store.dispatch('fetchCart')
  },
  methods: {
    deleteCart() {
      this.$store.dispatch('deleteCart', this.cart._id)
    },
    submitCart() {
      this.$store.dispatch('submitCart', this.cart._id)
    }
  },
  computed: {
    cart() {
      return this.$store.getters.cart
    },
    totalPriceState() {
      return this.$store.getters.totalPrice
    }
  }
}
</script>

<style></style>
