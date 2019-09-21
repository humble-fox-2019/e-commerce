<template>
  <div class="home" style="">
    <div class="container">
      <div class="row">
        <h1>Ini home</h1>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/Card'

export default {
  name: 'home',
  components: {
    Card
  }
}
</script>

<style scoped>
  .home {
    margin: 80px;
  }
</style>
