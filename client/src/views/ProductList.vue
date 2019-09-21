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
  },
  watch: {
    'toggleStatus.type'() {
      console.log('toggleBerubah')
      switch(this.toggleStatus.type) {
        case 'add_cart_success':
          console.log('add_cart_success')
          this.$swal.mixin({
            position: 'center',
            showConfirmButton: false,
            timer: 3000
          }).fire({
            type: 'success',
            title: this.toggleStatus.message
          })
          break;
        case 'add_cart_failed':
          this.$swal.mixin({
            position: 'center',
            showConfirmButton: false,
            timer: 3000
          }).fire({
            type: 'error',
            title: this.toggleStatus.message
          })
          break;
      }
    }
  }

}
</script>

<style>

</style>