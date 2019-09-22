<template>
  <div class="w-full h-20 flex justify-center">
    <div class="w-full flex border-t border-b my-2 mx-2">
      <div class="w-2/3 my-2 border-r pl-3 flex justify-between">
        <div>
          <h2 class="font-bold">{{ item.productId.name }}</h2>
          <p>Quantity: {{ item.qty }}, Price/item: {{ item.productId.price }}</p>
        </div>
        <div>
          <button
            v-if="!onProgress"
            @click="removeFromCart"
            class="hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-6 border border-red-500 hover:border-transparent rounded focus:outline-none mr-6"
          >
            Remove
          </button>
        </div>
      </div>
      <div class="w-1/3 my-2 pl-3">
        <h2></h2>
        {{ item.productId.price * item.qty }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cart',
  props: ['item', 'onProgress'],
  methods: {
    removeFromCart() {
      this.$store.dispatch('removeFromCart', this.item.productId._id)
    }
  }
}
</script>

<style></style>
