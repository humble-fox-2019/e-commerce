<template>
  <div id="app">
    <Header></Header>
    <transition name="slide">
      <router-view></router-view>
    </transition>
    <Footer></Footer>
    <ConfirmationLogout v-if="$store.state.isShowConfirm"></ConfirmationLogout>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import ConfirmationLogout from './components/ConfirmationLogout.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer,
    ConfirmationLogout
  },
  created() {
    if(localStorage.getItem('token')) {
      this.$store.dispatch('getUserData')
    }
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
