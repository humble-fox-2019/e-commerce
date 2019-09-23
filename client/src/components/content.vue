<template>
  <div class="products d-flex flex-column">
    <div class="main-products">
      <div class="products-list d-flex flex-wrap">
        <taskcard
          v-for="product in products"
          :key="product._id"
          :id="product._id"
          :name="product.productName"
          :description="product.description"
          :price="product.price"
          :stock="product.stock"
          :image_url="product.image_url"
        ></taskcard>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import taskcard from "../components/taskcard.vue";
export default {
  props: ["products"],
  components: {
    taskcard
  },
  methods: {},
  created() {}
};
</script>

<style>
</style>