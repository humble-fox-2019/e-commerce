<template>
  <div class="d-flex">
  <div
      class="product-image col-3"
      :style="{ backgroundImage: 'url(' + product.image + ')' }"
    ></div>
    <div class="main col-9 d-flex justify-content-between p-3">
      <div class="item-info d-flex flex-column align-items-start">
        <h3>{{product.name}}</h3>
        <p>{{product.description}}</p>
        <h5>Total / item: $ {{item.price}}</h5>
      </div>
  </div>
</template>

<script>
export default {
    props:["product"],
    data(){
        return{}
    }

}
</script>

<style>

</style>