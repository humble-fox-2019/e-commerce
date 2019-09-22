import Vue from 'vue'
import Vuex from 'vuex'
import axios from './configs/axios'
// import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {},
    products: [],
    product: {},
    cart: [],
    transactions: [],
    toggleStatus: {
      type: null,
      message: null
    }
  },
  mutations: {
    toggleStatus (state, {type, message}) {
      state.toggleStatus.type = type
      state.toggleStatus.message = message
    },
    fetchProducts (state, data) {
      state.products = data
    },
    getProduct (state, product) {
      state.product = product
    },
    fetchCart(state, data) {
      state.cart = data
    },
    addToCart (state, product) {
      state.cart.push(product)
    },
    fetchTransactions (state, transactions) {
      state.transactions = transactions
    },    
    setAuth (state, data) {
      state.auth = data
    },
    setLocalStorage(state, data) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('name', data.payload.name)
      localStorage.setItem('email', data.payload.email)
      localStorage.setItem('role', data.payload.role)
    },
    signout (state) {
      localStorage.clear()
      state.auth = {}
    }
  },
  actions: {
    fetchProducts (context) {
      axios({
        url: '/products',
        method: 'get',
        headers: {
          token: context.state.auth.token
        }
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('fetchProducts', data)
        })
        .catch(console.log)
    },
    getProduct (context, ProductId) {
      axios({
        url: `/products/${ProductId}`,
        method: 'GET',
        headers: {
          token: context.state.auth.token
        }
      })
        .then(({ data }) => {
          context.commit('getProduct', data)
        })
    },
    fetchCart(context) {
      context.commit('toggleStatus', {type: null, message: null})
      axios({
        url: '/users/cart',
        method: 'GET',
        headers: {
          token: context.state.auth.token
        }
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('fetchCart', data)
        })
        .catch(err => {
          if(err.response) {
            err.response.data.errors.forEach(error => {
              context.commit('toggleStatus', {type: 'not_authenticated', message: error})
            })
          }
        })
    },
    addToCart (context, {product, count}) {
      context.commit('toggleStatus', {type: null, message: null})
      axios({
        url: '/users/cart',
        method: 'post',
        headers: {
          token: context.state.auth.token
        },
        data: {
          ProductId: product._id,
          count: count
        }
      })
      .then(({ data }) => {
        // console.log(data)
        context.dispatch('fetchCart')
        context.commit('toggleStatus', {type: 'add_cart_success', message: data})
      })
      .catch(err => {
        if(err.response) {
          console.log(err.response.data.errors)
          err.response.data.errors.forEach(error => {
            context.commit('toggleStatus', {type: 'add_cart_failed', message: error})
          })
        }
      })
    },
    deleteCart (context, CartId) {
      context.commit('toggleStatus', {type: null, message: null})
      axios({
        url: `/users/cart/${CartId}`,
        method: 'DELETE',
        headers: {
          token: context.state.auth.token
        }
      })
        .then(({ data }) => {
          context.commit('toggleStatus', {type: 'delete_cart_success', message: data})
          context.dispatch('fetchCart')
        })
        .catch(console.log)
    },
    checkout (context) {
      context.commit('toggleStatus', {type: null, message: null})
      axios({
        url: '/users/checkout',
        method: 'POST',
        headers: {
          token: context.state.auth.token
        }
      })
        .then(({ data }) => {
          context.commit('toggleStatus', {type: 'checkout_success', message: data})
          context.dispatch('fetchCart')
          context.dispatch('fetchTransactions')      
        })
        .catch(err => {
          if (err.response) {
            err.response.data.errors.forEach(error => {
              context.commit('toggleStatus', {type: 'checkout_failed', message: error})          
            })
          }
        })
    },
    signin (context, payload) {
      context.commit('toggleStatus', {type: null, message: null})
      console.log(payload, 'ini payloadnya')
      axios({
        url: `/users/signin`,
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          context.commit('toggleStatus', {type: 'signin_success', message: 'Success login!'})
          context.commit('setAuth', data)
          context.commit('setLocalStorage', data)
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response.data)
            err.response.data.errors.forEach(error => {
              context.commit('toggleStatus', {type: 'signin_failed', message: error})
            })
          }
        })
    },
    signup (context, payload) {
      context.commit('toggleStatus', {type: null, message: null})
      let formData = new FormData() 
      formData.append('name', payload.name)
      formData.append('email', payload.email)
      formData.append('password', payload.password)
      axios({
        url: `/users/signup`,
        method: 'POST',
        data: formData
      })
        .then(({ data }) => {
          context.commit('toggleStatus', {type: 'signup_success', message: 'Signup success!'})
        })
        .catch(err => {
          if(err.response) {
            err.response.data.errors.forEach(error => {
              context.commit('toggleStatus', {type: 'signup_failed', message: error})
            })
          }
        })
    },
    fetchTransactions (context) {
      context.commit('toggleStatus', {type: null, message: null})
      axios({
        url: '/transactions',
        method: 'GET',
        headers: {
          token: context.state.auth.token
        }
      })
        .then(({ data }) => {
          context.commit('fetchTransactions', data)
        })
        .catch(err => {
          if(err.response) {
            err.response.data.errors.forEach(error => {
              context.commit('toggleStatus', {type: 'not_authenticated', message: error})
            })
          }
        })
    },
    pay (context, TransactionId) {
      context.commit('toggleStatus', {type: null, message: null})      
      axios({
        url: `/transactions/${TransactionId}/pay`,
        method: 'PATCH',
        headers: {
          token: context.state.auth.token
        }
      })
        .then(({ data }) => {
          context.commit('toggleStatus', {type: 'pay_success', message: data})
          context.dispatch('fetchTransactions')
        })
        .catch(err => {
          if (err.response) {
            err.response.data.errors.forEach(error => {
              context.commit('toggleStatus', {type: 'pay_failed', message: error})          
            })
          }
        })
    },
    min(context, CartId) {
      axios({
        url: `/users/cart/${CartId}`,
        method: 'PATCH',
        headers: {
          token: context.state.auth.token
        }
      })
        .then(({ data }) => {
          context.dispatch('fetch')
        })
    }
  }
})
