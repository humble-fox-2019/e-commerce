import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { userInfo } from 'os'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    isLoggedIn : false,
    cartItems : [],
    products : []
  },
  mutations: {
    addItem (state, item) {
      state.cartItems.push(item)
    },
    setProductsMute (state, products) {
      state.products = products.products
    },
    login (state) {
      state.isLoggedIn = true
      console.log(`logged in = ${state.isLoggedIn}`)
    },
    logout (state) {
      state.isLoggedIn = false
      console.log(`logged in = ${state.isLoggedIn}`)
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
    },
    register (context, packet){
      //console.log(password)
      console.log(packet.password) 
      axios({
        method : 'POST',
        url : 'http://localhost:3000/user/register',
        data : {
          email : packet.email,
          password : packet.password
        }
      })
      .then(({ data })=>{
        localStorage.setItem('token', data.token)
        context.commit('login')
      })
      .catch ((err)=>{
        console.log(err)
      }) 
    },
    login (context, packet){
      console.log(packet.password)
      axios({
        method : 'POST',
        url : 'http://localhost:3000/user/login',
        data : {
          email : packet.email,
          password : packet.password
        }
      })
      .then(({ data })=>{
        localStorage.setItem('token', data.token)
        context.commit('login')
      })
      .catch ((err)=>{
        console.log(err)
      }) 
    }
  }
})
