<template>
  <div>
      <ProductDetail :productId="this.$route.params.id"></ProductDetail>
  </div>
</template>

<script>
import ProductDetail from '../components/ProductDetail'
export default {
    name: "Detail",
    components: {
        ProductDetail
    }
}
</script>

<style>

</style>