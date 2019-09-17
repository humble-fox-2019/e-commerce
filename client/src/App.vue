<template>
  <div id="app">
    <Header></Header>
    <transition name="slide">
      <router-view></router-view>
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>
.slide-enter-active{
  animation: fadeIn .5s;
}
.slide-leave-active{
  animation: fadeOut .1s;
}
</style>
