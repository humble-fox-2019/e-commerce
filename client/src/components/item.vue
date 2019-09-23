<template>
  <div>
    <b-card class="mb-2">
      <b-card-body>
        <b-card-title>{{product.name}}</b-card-title>
        <b-card-sub-title class="mb-2">$ {{product.price}}</b-card-sub-title>
        <b-card-img :src="product.image" alt="Image" bottom></b-card-img>
        <b-card-text>Stocks: {{product.qty}}</b-card-text>
      </b-card-body>
      <b-button href="#" variant="primary">Buy Now</b-button>
    </b-card>
  </div>
</template>
<script>
export default {
  props: ["product"]
};
</script>

<style scoped>
</style>