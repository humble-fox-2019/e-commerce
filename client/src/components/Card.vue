<template>
<div class="card">
  <v-card class="mx-auto" width="240px">
    <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="160px"></v-img>
    <v-card-title>
      <div>
      <h5>{{productName}}</h5>
      <p>Price {{price}}</p>
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
  data() {
    return {
      index : 0,
      token : "",
      showBuy :  false,
      productName : 'Makan',
      price : 100000,
      stock : 5,
      item : {}
    }
  },
  methods: {
    toCart(){
      if (this.stock > 0){
        this.stock -= 1
        this.index++
        let basket = {
          index : this.index,
          data : this.item
        }
        this.$emit('toCart', basket)
      }
      else {
        
      }
    }
  },
  created() {
    if (localStorage.token){
      this.token = localStorage.token
    }
  },
  watch: {
    token(){
      if (this.token){
        this.showBuy = true
      }
      else if(this.token.length === 0){
        this.showBuy = false
      }
    }
  },
}
</script>

<style>
.v-card__actions .v-btn.v-btn {
    padding: 0 8px;
    background: rgb(40, 206, 165)
}
.card{  
    margin: 20px
}

</style>
