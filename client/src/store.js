import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import axios from 'axios'
import errorHandler from './js/errorHandler'
export default new Vuex.Store({
  state: {
    baseUrl: 'http://34.87.13.99',
    allProducts: [],
    status: null,
    cart: []
  },
  mutations: {
    changeStatus(state, data){
      state.status = data
    },
    setProduct(state, data){
      state.allProducts = data
    },
    setCart(state, data){
      state.cart = data
    }
  },
  actions: {
    fetchAllImages(context, data){
      axios({
        url: `${this.state.baseUrl}/products`,
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data })=>{
        context.commit('setProduct', data)

      })
      .catch(errorHandler)
    },
    fetchImage(context, data){
      axios({
        url: `${this.state.baseUrl}/products/brand/${data.brand}`,
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data })=>{
        context.commit('setProduct', data)

      })
      .catch(errorHandler)      
    },
    fetchCart(context, data){
      axios({
        url: `${this.state.baseUrl}/users/cart`,
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data })=>{
        context.commit('setCart', data)

      })
      .catch(errorHandler)
    }
  }
})