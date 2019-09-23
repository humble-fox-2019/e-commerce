<template>
  <div class="home">
    <Carousel />
    <ProductList></ProductList>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import ProductList from "../components/ProductList";
import Carousel from "../components/Carousel";

export default {
  name: "home",
  components: {
    HelloWorld,
    ProductList,
    Carousel
  }
};
</script>
<style>

</style>
