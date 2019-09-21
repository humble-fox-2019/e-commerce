<template>
  <div class="row">
    <!-- <h2>Product List</h2> -->
    <div class="col-3 mb-3" v-for="product in products" :key="product._id">
      <Card :product="product"></Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'
import { mapState } from 'vuex';

export default {
  components: { Card },
  computed: mapState(['products', 'toggleStatus'])
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
            position: 'center',
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

<style>

</style>