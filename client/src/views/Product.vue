<template>
  <div class="product-page">
    <Product></Product>
    <Product></Product>
    <Product></Product>
    <Product></Product>
    <Product></Product>
    <Product></Product>
    <Product></Product>
    <Product></Product>
    <Product></Product>
    <Product></Product>
  </div>
</template>

<script>

import Product from '../components/Product.vue'
export default {
  name: 'ProductPage',
  components: {
    Product
  }
}
</script>

<style scoped>

.product-page{
  display: flex;
  flex-wrap: wrap;
  max-width: 1100px;
  margin: auto;
}

</style>
