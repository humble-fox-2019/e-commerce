import Vue from 'vue'
import Vuex from 'vuex'
import axios from './api/server'
import router from './router'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    user: {
      name: ''
    },
    seller: {
      name: ''
    },
    role: 'costumer',
    isLogin: false,
    isShowConfirm: false,
    isShowNotifAdd: false
  },
  mutations: {
    setUserData(state, payload) {
      state.user = payload
      state.isLogin = true
      state.role = 'costumer'
    },
    clearUserData(state) {
      state.user = {
        name: ''
      }
    },
    setStoreData(state, payload) {
      state.seller = payload
      state.isLogin = true
      state.role = 'store'
    },
    clearStoreData(state, payload) {
      state.seller = {
        name: ''
      }
      state.role = 'costumer'
    },
    signout(state) {
      localStorage.clear()
      state.isLogin = false
      this.clearUserData
      this.clearStoreData
      state.isShowConfirm = false
      state.role = 'costumer'
      router.push('/')
    },
    toggleConfirm(state) {
      state.isShowConfirm = !state.isShowConfirm
    },
    toggleNotifAdd(state) {
      state.isShowNotifAdd = !state.isShowNotifAdd
    },
    deleteCart(state, cartId) {
      let carts = state.user.carts
      let newCarts = []
      for(let i=0;i<carts.length;i++) {
        if(carts[i]._id == cartId) {
          //skip
        }else {
          newCarts.push(carts[i])
        }
      }
      state.user.carts = newCarts
    }
  },
  actions: {
    getUserData(context, path) {
      axios.get('/user/get-user-data', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        context.commit('setUserData', data)
        if(path) {
          router.push(path)
        }else{
          router.push('/product')
        }
      })
      .catch(err => {
        router.push('/signin')
      })
    },
    getStoreData(context) {
      axios.get('/store/get-store-data', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        context.commit('setStoreData', data)
        router.push('/myproduct')
      })
      .catch(err => {
        router.push('/')
      })
    },
    addToCart(context, id) {
      let isAdded = false
      let carts = context.state.user.carts
      let cartId = null
      for(let i=0;i<carts.length;i++) {
        if(carts[i].product == id) {
          cartId = carts[i]._id
          isAdded = true
        }
      }
      if(isAdded) {
        axios.patch(`/cart/add-quantity/${cartId}`, {
          id
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          context.commit('toggleNotifAdd')
        })
        .catch(err => {
          console.log(err.response.data)
        })
      }else {
        axios.post('/cart', {
          id: id
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          context.commit('setUserData', data)
          context.commit('toggleNotifAdd')
        })
        .catch(err => {
          console.log(err.response.data)
        })
      }
    }
  }
})
