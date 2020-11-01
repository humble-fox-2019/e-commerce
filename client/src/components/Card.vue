<template>
    <div class="card" style="width: 17rem; border-radius: 0.8rem;">
        <div class="image" style="height: 200px">
          <img :src="product.image" class="" alt="" style="border-radius: 0.8rem; height: 100%; width: 100%; object-fit: cover">
        </div>
        <div class="card-body d-flex flex-column align-items-start">
            <h3 class="card-title">{{ product.name }}</h3>
            <p class="card-text">Rp {{ product.price }}</p> 
            <a href="" @click.prevent="goToDetail">View detail</a>
            <div class="input-group">
                <input class="form-control" type="number" value="1" v-model="count">
                <div class="input-group-append">
                    <button class="btn btn-sm btn-outline-success" type="button" @click="addToCart">Add to cart</button>
                </div>
            </div>
        </div>
        <div class="cart-footer">
        </div>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['product'],
  data() {
      return {
          count: 1,
      }
  },
  methods: {
    addToCart () {
      if (this.count >=1) {
        this.$store.dispatch('addToCart', {product: this.product, count: this.count})
      } else {
        this.$swal('Count minimal is 1!');
      }
    },
    goToDetail () {
      console.log('masuk ke detail yok', this.product._id)
      this.$router.push(`/products/${this.product._id}`)
    }
  }
}
</script>

<style scoped>
    .card {
        border-radius: 20px;
    }
</style>
