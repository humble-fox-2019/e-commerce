<template>
<div class="container">
  <div class="row">
   
       <title>Product</title>
     <appItem v-for="product in products" :key="product._id" :product="product" />
  
  </div>
</div>
</template>
<script>
import appItem from "../components/item";
import axios from "axios";
export default {
  components: {
    appItem
  },
  data() {
    return {
      products: []
    };
  },
  methods: {
    getItems() {
      axios({
        method: "GET",
        url: "http://localhost:3000/product/list"
      })
        .then(({data} )=> {
            console.log(data);
          this.products = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created(){
      this.getItems()
  }
};
</script>

<style>
</style>