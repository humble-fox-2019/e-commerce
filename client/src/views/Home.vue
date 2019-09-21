<template>
  <div class="home" style="">
    <div class="container">
      <div class="row">
        <div class="col-3 mb-3">
          <Card></Card>
        </div>
        <div class="col-3 mb-3">
          <Card></Card>
        </div>
        <div class="col-3 mb-3">
          <Card></Card>
        </div>
        <div class="col-3 mb-3">
          <Card></Card>
        </div>
        <div class="col-3 mb-3">
          <Card></Card>
        </div>
        <div class="col-3 mb-3">
          <Card></Card>
        </div>
        <div class="col-3 mb-3">
          <Card></Card>
        </div>
        <div class="col-3 mb-3">
          <Card></Card>
        </div>
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
