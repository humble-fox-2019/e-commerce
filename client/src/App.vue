<template>
  <div id="app">
    <transition name="slideup">
      <AddToCartNotification v-if="$store.state.isShowNotifAdd"></AddToCartNotification>
    </transition>
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
import AddToCartNotification from './components/AddToCartNotification.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    ConfirmationLogout,
    AddToCartNotification
  },
  created() {
    if(localStorage.getItem('token')) {
      if(localStorage.getItem('role') == 'costumer') {
        this.$store.dispatch('getUserData')
      }else{
        this.$store.dispatch('getStoreData')
      }
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
.slideup-enter-active{
  animation: slideInDown .3s;
}
.slideup-leave-active{
  animation: slideOutDown .1s;
}
</style>
