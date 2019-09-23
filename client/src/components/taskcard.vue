<template>
  <div class="card-inside mb-5">
    <div class="product-image">
      <img :src="image_url" alt="product" />
    </div>
    <div class="preview d-flex flex-column">
      <table>
        <tr>
          <td>Name</td>
          <td>: {{productName}}</td>
        </tr>
        <tr>
          <td>description</td>
          <td>: ${{description}}</td>
        </tr>
        <tr>
          <td>stock</td>
          <td>: {{stock}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id", "productName", "description", "stock", "price", "image_url"],
  data() {
    return {};
  },
  created() {
    console.log(this.productName, '<<< INI PRODUCT NAMES');
  }
};
</script>

<style>
</style>