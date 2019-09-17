<template>
  <div class="home">
    <Slider></Slider>
    <FeaturedProduct></FeaturedProduct>
    <BrandList></BrandList>
    <Footer></Footer>
  </div>
</template>

<script>

import Slider from '../components/Slider.vue'
import FeaturedProduct from '../components/FeaturedProduct.vue'
import BrandList from '../components/BrandList.vue'

export default {
  name: 'home',
  components: {
    Slider,
    FeaturedProduct,
    BrandList
  }
}
</script>

<style>

</style>
