<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import Signup from '../views/Signup'
import Signin from '../views/Signin'
export default {
  name: 'Auth',
  components: { Signup, Signin }
}
</script>

<style scoped>
  .container {
    padding-top: 80px;
  }
</style>