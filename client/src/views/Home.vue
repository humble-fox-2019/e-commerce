<template>
  <div class="home">
    <Header></Header>
    <Slider></Slider>
    <FeaturedProduct></FeaturedProduct>
    <BrandList></BrandList>
    <Footer></Footer>
  </div>
</template>

<script>

import Header from '../components/Header.vue'
import Slider from '../components/Slider.vue'
import FeaturedProduct from '../components/FeaturedProduct.vue'
import BrandList from '../components/BrandList.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'home',
  components: {
    Header,
    Slider,
    FeaturedProduct,
    BrandList,
    Footer
  }
}
</script>

<style>

</style>
