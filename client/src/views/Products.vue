<template>
  <div class="products" style="">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import ProductList from '@/views/ProductList'
import Detail from '@/views/Detail'
import { mapState } from 'vuex';

export default {
  name: 'Products',
  components: { ProductList, Detail },
}
</script>

<style scoped>
    .products{
        margin: 80px;
    }
</style>
