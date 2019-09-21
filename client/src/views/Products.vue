<template>
  <div class="products" style="">
    <div class="container">
      <div class="row">
        <div class="col-3 mb-3" v-for="product in products" :key="product._id">
          <Card :product="product"></Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'
import { mapState } from 'vuex';

export default {
  name: 'Products',
  components: { Card },
  computed: mapState(['products', 'toggleStatus '])
  ,
  created () {
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('fetchCart')
  },
  watch: {
    toggleStatus() {
      switch(this.toggleStatus) {
        case 'add_cart_success':
          this.$swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000
          }).fire({
            type: 'success',
            title: 'Added to your cart!'
          })
          break;
       
      }
    }
  }

}
</script>

<style scoped>
    .products{
        margin: 80px;
    }
</style>
