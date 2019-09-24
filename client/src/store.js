import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { userInfo } from 'os'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    isLoggedIn : false,
    cartItems : [],
    products : [],
    cart : ""
  },
  mutations: {
    addItem (state, item) {
      //state.cartItems.push(item)
      state.cart.items.push(item)
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
      localStorage.clear('token')
      console.log(`logged in = ${state.isLoggedIn}`)
    },
    initializeCart (state, newCart) {
      state.cart = newCart
      console.log(state.cart)
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
        context.dispatch('createCart')
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
        context.dispatch('createCart')
      })
      .catch ((err)=>{
        console.log(err)
      }) 
    },
    createCart (context){
      axios({
        method : 'POST',
        url : 'http://localhost:3000/cart',
        headers : {token : localStorage.getItem('token')}
      })
      .then(({ data }) =>{
        context.commit('initializeCart', data.shoppingCart)
      })
      .catch ((err)=>{
        console.log(err)
      })
    },
    //logout aka removeCart
    logout (context){
      axios({
        method : 'DELETE',
        url : 'http://localhost:3000/cart',
        headers : { token : localStorage.getItem('token')}
      })
      .then(({ data })=>{
        console.log(data.message)
        context.commit('logout')
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }
})
