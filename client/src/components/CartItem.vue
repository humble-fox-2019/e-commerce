<template>
  <div class="cart-item">
    <div class="cart-image">
      <img :src="cart.product.image">
    </div>
    <div class="cart-text">
      <div class="cart-text-title">
        <h2>{{ cart.product.name }}</h2>
      </div>
      <div class="cart-text-price">
        <p>{{ formatPrice(cart.product.price) }}</p>
      </div>
    </div>
    <div class="cart-action">
      <div class="quantity">
        <button class="quantity-update" @click="$emit('minusQuantity', cart._id, cart.product._id)">
          <span>-</span>
        </button>
        <div class="quantity-input">
          {{cart.quantity}}
        </div>
        <button class="quantity-update" @click="$emit('addQuantity', cart._id, cart.product._id)">
          <span>+</span>
        </button>
      </div>
      <div class="delete" @click="$emit('deleteCart',cart._id)">
        <i class="far fa-trash-alt"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: ['cart'],
  methods: {
    formatPrice(price) {
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
    },
  }
}
</script>

<style scoped>

.cart-item{
  display: flex;
  align-items: center;
  border-radius: 20px;
}
.cart-item:not(:last-child){
  margin-bottom: 20px;
}
.cart-image{
  flex-basis: 150px;
  padding: 10px;
}
.cart-image img{
  width: 100%;
  border-radius: 5px;
}
.cart-text{
  flex-grow: 1;
  padding: 10px;
}
.cart-text-title h2{
  font-size: 14pt;
}
.cart-action{
  display: flex;
  align-items: center;
}
.cart-action .delete{
  background-color: #e93030;
  padding: 2px 6px;
  font-weight: bold;
  font-size: 10pt;
  color: #ffffff;
  border-radius: 3px;
  margin-left: 20px;
  cursor: pointer;
}
.quantity{
  display: flex;
  align-items: center;
}
.quantity-input{
  margin: 0 10px;
  font-size: 16pt;
  font-weight: bold;
  margin-bottom: 3px;
}
.quantity-input input{
  width: 40px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid rgba(0,0,0,.1);
  font-size: 16pt;
  text-align: center;
}
.quantity-input input:focus{
  outline: none;
}
.quantity-update{
  background-color: #56d13d;
  padding: 0 6px;
  font-weight: bold;
  font-size: 12pt;
  color: #ffffff;
  border-radius: 3px;
  border: none;
  cursor: pointer;
}

</style>