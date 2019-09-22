<template>
  <div class="card">
    <v-card class="mx-auto" width="280px" height="380px">
      <v-img :src="product.image" height="180px" contain></v-img>
      <v-card-title>
        <div>
          <h5>{{product.productName}}</h5>
          <p>Price : Rp {{(product.price).toLocaleString('id-IDR')}}</p>
          <p>Stock : {{stock}}</p>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn text @click="toCart" v-if="showBuy" class="style1">Buy</v-btn>
        <v-btn hidden>Show Detail</v-btn>
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
        this.$toastr.Add({
          title: 'Sorry this product is out of stock',
          msg: '',
          clickClose: false,
          timeout: 2000,
          position: 'toast-top-center',
          type: 'info',
          preventDuplicates: true,
          style: {
            backgroundColor: '#3753f3',
            width: '525px',
            'font-size': '21pt'
          }
        })
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
@import url("https://fonts.googleapis.com/css?family=Be+Vietnam|Muli|Roboto&display=swap");
* {
  margin: 0;
  padding: 0;
  font-family: "Be Vietnam", sans-serif;
}
.v-card__actions .v-btn.v-btn {
  padding: 0 8px;
  background: rgb(40, 206, 165);
  margin: 0 auto;
}
.v-card__title {
  display: flex;
  justify-content: center;
}

.card {
  margin: 20px;
}
h5 {
  font-size: 14.5pt;
  text-align: center;
}
p {
  font-size: 13pt;
  font-family: "Roboto", sans-serif;
  margin-bottom: 18px;
}
</style>
