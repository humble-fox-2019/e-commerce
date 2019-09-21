<template>
  <div class="w-full h-20 flex justify-center">
    <div class="w-full flex border-t border-b my-2 mx-2">
      <div class="w-2/3 my-2 border-r pl-3">
        <h2 class="font-bold">{{ productName }}</h2>
        <p>Quantity: {{ qty }}</p>
      </div>
      <div class="w-1/3 my-2 pl-3">
        <h2></h2>
        {{ price * qty }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cart',
  props: ['product'],
  data() {
    return {
      id: 1,
      productName: 'Gitar',
      qty: 2,
      price: 10000
    }
  }
}
</script>

<style></style>
