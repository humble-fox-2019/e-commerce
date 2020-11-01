<template>
    <div class="container">
      <router-view></router-view>
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
    .container{
        padding-top: 80px;
    }
</style>
