<template>
  <div class="home">
    <Header></Header>
    <Slider></Slider>
    <FeaturedProduct></FeaturedProduct>
  </div>
</template>

<script>

import Header from '../components/Header.vue'
import Slider from '../components/Slider.vue'
import FeaturedProduct from '../components/FeaturedProduct.vue'

export default {
  name: 'home',
  components: {
    Header,
    Slider,
    FeaturedProduct
  }
}
</script>

<style>

</style>
