<template>
<div class="card">
  <v-card class="mx-auto" width="280px" height="380px">
    <v-img :src="product.image" height="180px" contain ></v-img>
    <v-card-title>
      <div>
      <h5>{{product.productName}}</h5>
      <p>Price : Rp {{(product.price).toLocaleString('id-IDR')}}</p>
      <p>Stock : {{stock}}</p>
      </div>
    </v-card-title>
    <v-card-actions class="d-flex-center">
       <v-btn-toggle
          mandatory
        >
      <v-btn text @click="toCart" v-if="showBuy" class="style1">Buy</v-btn>
      <div class="flex-grow-1"></div>
      <v-btn >Show Detail</v-btn>
      </v-btn-toggle>
    </v-card-actions>
  </v-card>
</div>
</template>

<script>
export default {
  props: ['product'],
  data () {
    return {
      index: 0,
      token: '',
      showBuy: false,
      productName: 'Makan',
      price: 100000,
      stock: 5,
      item: {}
    }
  },
  methods: {
    toCart () {
      if (this.stock > 0) {
        this.stock -= 1
        this.index++
        let basket = {
          index: this.index,
          product: this.product
        }
        this.$emit('toCart', basket)
      } else {

      }
    }
  },
  created () {
    if (localStorage.token) {
      this.token = localStorage.token
    }
    this.stock = this.product.stock
  },
  watch: {
    token () {
      if (this.token) {
        this.showBuy = true
      } else if (this.token.length === 0) {
        this.showBuy = false
      }
    }
  }
}
</script>

<style scoped>
.v-card__actions .v-btn.v-btn {
    padding: 0 8px;
    background: rgb(40, 206, 165)
}
.v-card__title {
  display: flex;
  justify-content: center
}

.card{
    margin: 20px
}
h5{
  font-size: 14.5pt;
  text-align: center
}
p{
  font-size: 13pt
}

</style>
