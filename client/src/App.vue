<template>
  <div id="app">
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  
}
</script>
<style lang="scss">

.slide-enter-active{
  animation: shake .5s;
}
.slide-leave-active{
  animation: fadeOut .2s;
}
</style>
