<template>

<div class="container mt-4">
    <center>
<div class="row">
<product v-for="product in allProducts.data" :key="product.id" v-bind:product="product"></product>
  </div>
    </center>
  </div>
</template>


<script>
import product from './productcard'

export default {
  components: {
    product
  },
  mounted: function () {
    this.$store.dispatch('getAllProducts')
  },
  computed: {

    allProducts () {
      return this.$store.state.allProducts
    }
  }

}
</script>

<style scoped>

</style>
