<template>
  <div class="h-screen flex">
    <div class="w-5/6 flex flex-wrap mt-10 ml-16 overflow-y-auto">
      <Product v-for="product in products" :key="product.id" :product="product"></Product>
      <router-view></router-view>
    </div>
    <div class="w-1/6 h-full mt-10 border-l-2">
      <div class="h-full">
        <span class="vertical-text font-extrabold text-6xl my-32">Items</span>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/components/Product.vue'

import myAxios from '@/configs/myAxios.js'
import errorHandler from '@/configs/errorHandler.js'

export default {
  name: 'products',
  components: {
    Product
  },
  // data() {
  //   return {
  //     products: []
  //   }
  // },
  // methods: {
  //   fetchProducts() {
  //     myAxios
  //       .get('/products')
  //       .then(({ data }) => {
  //         // console.log(data)
  //         this.isLoading = false
  //         this.products = data.products
  //       })
  //       .catch(err => {
  //         this.isLoading = false
  //         this.errors = errorHandler(err)
  //       })
  //   }
  // },
  created() {
    // this.fetchProducts()
    this.$store.dispatch('fetchProducts')
  },
  computed: {
    products() {
      return this.$store.getters.products
    }
  }
}
</script>

<style scoped>
.vertical-text {
  writing-mode: vertical-rl;
}
</style>
