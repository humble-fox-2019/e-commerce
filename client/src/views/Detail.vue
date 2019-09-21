<template>
  <div class="detail d-flex flex-column justify-content-start">
      <h1>Product Detail</h1>
      <div class="content d-flex justify-content-start mt-3">
        <div class="image mr-4">
          <img :src="product.image" :alt="product.name">
        </div>
        <div class="description d-flex flex-column align-items-start">
          <h2><strong> {{ product.name }} </strong></h2>
          <span> {{ product.description }} </span>
          <br>
          <h4>Rp {{ product.price }}</h4>
          <div class="">
            <div class="mb-2">
            <span class="fa" @click="min">
              <font-awesome-icon class="mx-2" icon="minus" size="xs"/>
            </span> 
              <input type="text" v-model="count" maxlength="10" size="2" readonly style="text-align: center; border-radius: 4px">
            <span class="fa" @click="plus"> 
              <font-awesome-icon class="mx-2" icon="plus" size="xs" /> 
            </span> 
            </div>
            <button class="btn btn-sm btn-outline-success" type="button" @click="addToCart">Add to cart</button>
          </div>
      </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Detail',
  computed: mapState(['product', 'toggleStatus']),
  data () {
    return {
      count : 1
    }
  },
  methods: {
    min () {
      this.count--
      if(this.count <= 0) {
        this.count = 1
      }
    },
    plus () {
      this.count++
    },
    addToCart () {
      if (this.count >=1) {
        this.$store.dispatch('addToCart', {product: this.product, count: this.count})
        // this.$swal.fire(
        //   'Success!',
        //   'Product added to cart!',
        //   'success'
        // )
      } else {
        this.$swal('Count minimal is 1!');
      }
    }
  },
  created () {
    this.$store.dispatch('getProduct', this.$route.params.id)
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

<style scoped>
 .image {
   width: 300px;
   height: 300px;
 }
 img {
   width: 100%;
   height: 100%;
   object-fit: cover;
   border-radius: 15px;
 }
 .fa {
   cursor: pointer;
 }
</style>