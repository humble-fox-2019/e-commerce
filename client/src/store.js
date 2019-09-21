import Vue from 'vue'
import Vuex from 'vuex'
import axios from './configs/axios'
// import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    cart: [],
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDg1N2JkNWJhOGU0ZDFiZmRkMGZiNzgiLCJuYW1lIjoiY3VzdG9tZXIgYmFydSIsImVtYWlsIjoiY3VzdG9tZXJiYXJ1QG1haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNTY5MDI5MTE3fQ.No5xKd5eHyA0zVkkIFDSffZEv34qeSpIKuM2kuMsej0',
    toggleStatus: null
  },
  mutations: {
    toggleStatus (state, status) {
      state.toggleStatus = status
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
    }
  },
  actions: {
    fetchProducts (context) {
      axios({
        url: '/products',
        method: 'get',
        headers: {
          token: context.state.token
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
          token: context.state.token
        }
      })
        .then(({ data }) => {
          context.commit('getProduct', data)
        })
    },
    fetchCart(context) {
      axios({
        url: '/users/cart',
        method: 'GET',
        headers: {
          token: context.state.token
        }
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('fetchCart', data)
        })
        .catch(console.log)
    },
    addToCart (context, {product, count}) {
      context.commit('toggleStatus', null)
      axios({
        url: '/users/cart',
        method: 'post',
        headers: {
          token: context.state.token
        },
        data: {
            ProductId: product._id,
            count: count
        }
      })
      .then(({ data }) => {
        context.commit('toggleStatus', 'add_cart_success')
        context.dispatch('fetchCart')
      })
      .catch(console.log)
    },
    deleteCart (context, CartId) {
      context.commit('toggleStatus', null)
      axios({
        url: `/users/cart/${CartId}`,
        method: 'DELETE',
        headers: {
          token: context.state.token
        }
      })
        .then(({ data }) => {
          context.commit('toggleStatus', 'delete_cart_success')
          context.dispatch('fetchCart')
        })
        .catch(console.log)
    },
    min(context, CartId) {
      axios({
        url: `/users/cart/${CartId}`,
        method: 'PATCH',
        headers: {
          token: context.state.token
        }
      })
        .then(({ data }) => {
          context.dispatch('fetch')
        })
    }
  }
})
