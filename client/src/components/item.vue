<template>
  <div class="col-md-4 mb-2 mt-4">
    <b-card class="">
      <b-card-body>
        <b-card-title>{{product.name}}</b-card-title>
        <b-card-sub-title class="mb-2">$ {{product.price}}</b-card-sub-title>
        <b-card-img :src="product.image" alt="Image" bottom></b-card-img>
        <b-card-text>Stocks: {{product.qty}}</b-card-text>
      </b-card-body>
      <b-button  variant="primary" @click="gotopage(product._id)" >Buy Now</b-button>
    </b-card>
  </div>
</template>
<script>
export default {
  props: ["product"],
  methods: {
    gotopage(id){
      this.$router.push(`/Cart/${id}`)
    }
  },
}
</script>

<style scoped>
</style>