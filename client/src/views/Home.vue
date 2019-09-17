<template>
  <div class="home">
    <Header></Header>
    <Slider></Slider>
  </div>
</template>

<script>

import Header from '../components/Header.vue'
import Slider from '../components/Slider.vue'
export default {
  name: 'home',
  components: {
    Header,
    Slider
  }
}
</script>

<style>

</style>
