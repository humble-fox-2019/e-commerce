<template>
  <div class="w-full">
    <div class="mt-10 mx-64">
      <h1 class="text-4xl font-bold mb-4 border-b-2 border-black">Checkout</h1>
      <div>
        <div class="flex">
          <h2 class="w-2/3 text-2xl font-bold">Items</h2>
          <h2 class="w-1/3 text-2xl font-bold ml-auto">Subtotal</h2>
        </div>
        <Cart></Cart>
        <Cart></Cart>
      </div>
    </div>

    <div class="mt-6 mx-64 mb-4">
      <h2 class="text-2xl font-bold">Invoice</h2>
      <p class="text-lg">Total: 10000</p>
    </div>

    <div class="mx-64 flex justify-center">
      <button class="px-5 py-2 bg-black text-white rounded focus:outline-none">Confirm</button>
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
  data() {
    return {
      items: [
        {
          id: 1,
          name: 'gitar',
          qty: 2,
          price: 10000
        },
        {
          id: 2,
          name: 'bass',
          qty: 1,
          price: 5000
        }
      ]
    }
  }
}
</script>

<style></style>
