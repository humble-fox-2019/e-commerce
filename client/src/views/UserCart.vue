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
</style>