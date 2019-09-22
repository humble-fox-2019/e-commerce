<template>
  <div class="my-cart">
    <transition name="slideup">
      <ConfirmationDelete
        v-if="isShowConfirm"
        @confirm="confirmDelete">
      </ConfirmationDelete>
    </transition>
    <h1>My cart</h1>
    <div class="carts">
      <CartItem
        v-for="(cart, index) in carts"
        :key="index"
        :cart="cart"
        @addQuantity="addQuantity"
        @minusQuantity="minusQuantity"
        @deleteCart="toggleConfirmDelete">
      </CartItem>
    </div>
    <div class="cart-chekout" v-if="carts.length > 0">
      <div class="price">
        <h4>Total price</h4>
        <span>{{ getTotalPrice }}</span>
      </div>
      <div class="action">
        <button @click="checkout">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>

import CartItem from '../components/CartItem.vue'
import ConfirmationDelete from '../components/ConfirmationDelete.vue'
import axios from '../api/server.js'

export default {
  name: 'UserCart',
  components: {
    CartItem,
    ConfirmationDelete
  },
  data() {
    return {
      carts: [],
      cartId: null,
      isShowConfirm: false
    }
  },
  methods: {
    addQuantity(cartId, productId) {
      axios.patch(`/cart/add-quantity/${cartId}`, {
        id: productId
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          for(let i=0;i<this.carts.length;i++) {
            if(data._id == this.carts[i]._id) {
              this.carts[i].quantity = data.quantity
            }
          }
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    minusQuantity(cartId, productId) {
      axios.patch(`/cart/minus-quantity/${cartId}`, {
        id: productId
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          for(let i=0;i<this.carts.length;i++) {
            if(data._id == this.carts[i]._id) {
              this.carts[i].quantity = data.quantity
            }
          }
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    toggleConfirmDelete(cartId) {
      this.isShowConfirm = !this.isShowConfirm
      this.cartId = cartId
    },
    confirmDelete(confirm) {
      if(confirm) {
        this.deleteCart(this.cartId)
        this.$store.commit('deleteCart', this.cartId)
      }else {
        this.toggleConfirmDelete(null)
      }
    },
    deleteCart(cartId) {
      axios.delete(`/cart/${cartId}`,{
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.toggleConfirmDelete(null)
          let newCarts = []
          for(let i=0;i<this.carts.length;i++) {
            if(this.carts[i]._id == cartId) {
              //skip
            }else {
              newCarts.push(this.carts[i])
            }
          }
          this.carts = newCarts
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
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
    checkout() {
      axios.post('/transaction', {
        carts: this.carts
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        console.log(data)
      })
      .catch(err => {
        console.log(err.response.data)
      })
    }
  },
  created() {
    axios.get('/cart', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      this.carts = data
    })
    .catch(err => {
      console.log(err.response.data)
    })
  },
  computed: {
    getTotalPrice : function () {
      let totalPrice = 0
      for(let i=0;i<this.carts.length;i++) {
        let item = this.carts[i]
        totalPrice += item.quantity * item.product.price
      }
      return this.formatPrice(totalPrice)
    }
  }
}
</script>

<style scoped>

.my-cart h1{
  color: #43ca34;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e9e9e9;
}
.slideup-enter-active{
  animation: slideInDown .3s;
}
.slideup-leave-active{
  animation: slideOutDown .1s;
}
.cart-chekout{
  padding-top: 20px;
  margin-top: 20px;
  border-top: 1px solid #e4e4e4;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.cart-chekout .price h4{
  font-size: 10pt;
  margin-bottom: 10px;
}

.cart-chekout .price span{
  font-size: 24pt;
  font-weight: bold;
  color: #43ca34;
  padding: 10px;
  border-radius: 5px;
  background-color: #e4ffe1;
  display: inline-block;
}
.cart-chekout .action button{
  padding: 10px 30px;
  background-color: #43ca34;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  font-size: 12pt;
  font-weight: bold;
  cursor: pointer;
}
.cart-chekout .action button:hover{
  background-color: #63e055;
}
.cart-chekout .action button:focus{
  outline: none;
}
.cart-chekout .action button:active{
  transform: scale(0.95);
}
</style>