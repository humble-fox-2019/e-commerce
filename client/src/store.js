import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    cartItems : [],
    products : []
  },
  mutations: {
    addItem (state, item) {
      state.cartItems.push(item)
    },
    setProductsMute (state, products) {
      state.products = products.products
    }
  },
  actions: {
    getProducts (context){
      axios({
        method : 'GET',
        url : 'http://localhost:3000/product'
      })
      .then(({data})=>{
          context.commit('setProductsMute',data)
          //console.log(data)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }
})
