<template>
  <div class="home">
    <section id="hero">
      <Header></Header>
      <HotProduct></HotProduct>
    </section>
    <PurposeList></PurposeList>
    <BrandList></BrandList>
    <PopularProduct></PopularProduct>
  </div>
</template>

<script>

import Header from '../components/Header'
import HotProduct from '../components/HotProduct'
import PurposeList from '../components/PurposeList'
import BrandList from '../components/BrandList'
import PopularProduct from '../components/PopularProduct'

export default {
  name: 'home',
  components: {
    Header,
    HotProduct,
    PurposeList,
    BrandList,
    PopularProduct
  }
}
</script>

<style>

</style>