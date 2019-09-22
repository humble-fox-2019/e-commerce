<template>
  <div class="product-page">
    <Product
      v-for="product in products"
      :key="product._id"
      :product="product">
    </Product>
  </div>
</template>

<script>

import Product from '../components/Product.vue'
import axios from '../api/server'

export default {
  name: 'ProductPage',
  components: {
    Product
  },
  data() {
    return {
      products: []
    }
  },
  created() {
    axios.get('/product')
      .then(({data}) => {
        this.products = data.products
      })
      .catch(err => {
        console.log(err.response.data)
      })
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
