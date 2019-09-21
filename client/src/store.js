import Vue from 'vue'
import Vuex from 'vuex'
import axiosInstance from './api/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products : [],
    role : null,
    carts : []
  },
  mutations: {
    setProducts( state , payload ) {
        state.products = payload
    },
    setRole( state, role ) {
      state.role = role;
    },
    setCarts( state, carts ) {
      state.carts = carts
    }
  },
  actions: {
    fetchProduct ( context ) {
        axiosInstance({
            method:"GET",
            url: '/products'
        })
        .then( response => {
            context.commit( 'setProducts' , response.data )
        })
        .catch( err => {
            console.log( err.response )
        })
    },
    fetchCarts ( context ) {
        const token =localStorage.getItem('token')
        axiosInstance({
          method :"GET",
          url: "/products/cart",
          headers : {
            token 
          }
        })
        .then( response => {
          context.commit('setCarts', response.data )
        })
        .catch( console.log )
    }
  }
})
