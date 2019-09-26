<template>
  <div class="featured-product">
    <h1>Featured product</h1>
    <div class="product-wrapper">
      <Product
        v-for="product in products"
        :key="product._id"
        :product="product">
      </Product>
    </div>
  </div>
</template>

<script>

import Product from '../components/Product.vue'
import axios from '../api/server'
export default {
  name: 'FeaturedProduct',
  components: {
    Product
  },
  data() {
    return {
      products: []
    }
  },
  created() {
    axios.get('/product/featured')
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
.featured-product{
  margin: 60px auto;
  max-width: 1100px;
}
.product-wrapper{
  display: flex;
  justify-content: center;
}
h1{
  font-size: 18pt;
  color: #43ca34;
  padding: 30px 0;
  margin-bottom: 60px;
  border-bottom: 1px solid rgba(0,0,0,.1);
}
</style>