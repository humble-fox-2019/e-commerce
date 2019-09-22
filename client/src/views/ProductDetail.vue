<template>
  <div id="product-detail">
    <div class="product-image">
      <img :src="product.image">
    </div>
    <div class="product-text">
      <h1>{{ product.name }}</h1>
      <p>{{ product.description }}</p>
      <p class="product-price">{{ getPrice }}</p>
      <div class="store-detail">
        <h3>Dijual oleh :</h3>
        <h4>{{ product.store.name }}</h4>
        <p><i class="fas fa-map-marker-alt"></i> {{ product.store.city }}, {{ product.store.province }}</p>
      </div>
      <div class="product-action">
        <a href=""><i class="fas fa-shopping-cart"></i> Add to cart</a>
      </div>
    </div>
  </div>
</template>

<script>

import axios from '../api/server'

export default {
  name: 'ProductDetail',
  data() {
    return {
      product: null
    }
  },
  created() {
    axios.get(`/product/${this.$route.params.id}`)
      .then(({data}) => {
        this.product = data.product
      })
      .catch(err => {
        this.$router.push('/')
      })
  },
  computed: {
    getPrice() {
      let price = this.product.price
      if(!price) {
        return 0
      }else{
        price = price.toString()
        let newPrice = ''
        let index = 0
        for(let i=price.length-1;i>=0;i--) {
          if(index % 3 == 0 && index != 0) {
            newPrice = '.' + newPrice
          }
          index++
          newPrice = price[i] + newPrice
        }
        return 'Rp. ' + newPrice
      }
    }
  }
}
</script>

<style scoped>

#product-detail{
  display: flex;
  max-width: 1100px;
  margin: 50px auto;
  align-items: center;
}
.product-image{
  flex-basis: 50%;
  margin-right: 20px;
}
.product-image img{
  width: 100%;
  border-radius: 5px;
}
.product-price{
  font-size: 22pt;
  display: inline-block;
  margin: 15px 0;
  color: #43ca34;
}
.product-text {
  flex-basis: 50%;
}
.product-action a{
  padding: 10px;
  color: #ffffff;
  background-color: #43ca34;
  display: inline-block;
  font-size: 10pt;
  font-weight: bold;
  border-radius: 5px;
}
.product-action a:hover{
  background-color: #5ae44a;
}
.store-detail{
  margin: 10px 0;
  padding-top: 20px;
  border-top: 1px solid #eeeeee;
}
.store-detail h3{
  font-weight: normal;
  font-size: 10pt;
  margin-bottom: 5px;
}
.store-detail h4{
  font-size: 10pt;
}
.store-detail p{
  font-size: 10pt;
}

</style>
