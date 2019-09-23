import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

const base_url = 'http://localhost:3000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userTransactions: [],
    isLogin: false,
    allProducts: [],
    productDetails: {},
    allCarts: [],
    username: ''
  },
  mutations: {

    status_login(state, payload) {
      // console.log(payload)
      state.isLogin = payload
    },
    all_products(state, payload) {
      state.allProducts = payload
    },
    detail_product(state, payload) {
      state.productDetails = payload
    },
    all_carts(state, payload) {
      console.log(payload ,"ini payload all_carts")
      state.allCarts = payload
      console.log(state.allCarts, "ini state allCarts")
    },
    all_user_transaction(state, payload) {
      state.userTransactions = payload
    },
    logged_username(state, payload) {
      state.username = payload
    }

  },
  actions: {
    userLogin({ commit }, payload) {
      let email = payload.email
      let password = payload.password

      axios({
        url: `${base_url}/user/login`,
        method: 'POST',
        data: { email, password }
      })
        .then(response => {
          console.log(response.data, ">>>>>>>>>>>>>>>>>ini userlogin")
          let token = response.data.token
          let username = response.data.username
          localStorage.setItem('token', token)
          commit('status_login', true)
          commit('logged_username', username)
          Vue.swal.close()
          Vue.swal.fire({
            type: 'success',
            title: `You Have successfully Login`,
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          Vue.swal.fire({
            type: 'error',
            title: `${err.message}`,
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    userRegister({ commit }, payload) {
      console.log("================= ini dispatch userrehister")
      console.log(payload)
      let email = payload.email
      let password = payload.password
      let username = payload.username
      axios({
        url: `${base_url}/user/register`,
        method: 'POST',
        data: {
          email: email,
          password: password,
          name: username
        }
      })
        .then(response => {
          console.log(response.data)
          Vue.swal.fire({
            type: 'success',
            title: 'You Have successfully register account!',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log("<<<<<<<<<<<<<<<<<")
          console.log(err.response.data.errArray)
          let message = err.response.data.errArray.join("\n")
          Vue.swal.fire({
            type: 'error',
            title: `${message}`,
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    getAllProducts({ commit }) {
      axios({
        url: `${base_url}/product`,
        method: 'GET'
      })
        .then(response => {
          console.log(response.data)
          let products = response.data
          commit('all_products', products)
        })
        .catch(err => {
          console.log(err)
          let message = err.response.data.message
          Vue.swal.fire({
            type: 'error',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    getOneProduct({ commit }, id) {
      axios({
        url: `${base_url}/product/${id}`,
        method: 'GET'
      })
        .then(response => {
          console.log("================== ini hasil getOne")
          console.log(response.data)
          commit('detail_product', response.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToCart({ commit }, payload) {
      let token = localStorage.getItem('token')
      console.log(payload, "masuk ke addtocart di store")
      axios({
        url: `${base_url}/cart/`,
        method: 'POST',
        data: payload,
        headers: {
          token
        }
      })
        .then(response => {
          console.log(response.data)
          Vue.swal.close()
          Vue.swal.fire({
            type: 'success',
            title: 'You success add product to cart',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log(err.response, "+++++++++++++")
          let message = err.response.data.message
          Vue.swal.fire({
            type: 'error',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })

          // console.log(err,"masuk ke error addtocart")
        })
    },
    getAllCarts({ commit }) {
      let token = localStorage.getItem('token')
      axios({
        method: 'GET',
        url: `${base_url}/cart`,
        headers: {
          token
        }
      })
        .then(response => {
          let allcarts = response.data.data
          let stillNotBuy = []
          //console.log(allcarts)
          for (let i = 0; i < allcarts.length; i++) {
            if (!allcarts[i].checkout_status) {
              stillNotBuy.push(allcarts[i])
            }
          }
          console.log(stillNotBuy, "---------------------- ini untuk commit all_carts")
          commit('all_carts', stillNotBuy)
        })
        .catch(err => {
          // console.log(err.response.data.message)
          let message = err.response.data.message
          Vue.swal.fire({
            type: 'error',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    removeCart({ commit, dispatch }, id) {
      let token = localStorage.getItem('token')
      console.log("masuk ke store removecart")
      axios({
        url: `${base_url}/cart/${id}`,
        method: 'DELETE',
        headers: { token }
      })
        .then(response => {
          console.log(response)
          dispatch('getAllCarts')
          Vue.swal.fire(
            'Deleted!',
            'Your Cart has been deleted.',
            'success'
          )
        })
        .catch(err => {
          // console.log(err)
          let message = err.response.data.message
          Vue.swal.fire({
            type: 'error',
            title: message,
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    createTransaction({ commit, dispatch }, payload) {
      console.log(payload,"<<<<< ini createTransaction store")
      let token = localStorage.getItem('token')
      axios({
        url: `${base_url}/transaction`,
        method: 'POST',
        data: payload,
        headers: {
          token
        }
      })
        .then(response => {
          console.log("success")
          console.log(response.data)
          Vue.swal.close()
          Vue.swal.fire({
            type: 'success',
            title: 'You Have successfully do transaction',
            showConfirmButton: false,
            timer: 2000
          })
          dispatch('getAllCarts')
        })
        .catch(err => {
          // console.log(err.response.data.message)
          let message = err.response.data.message
          Vue.swal.fire({
            type: 'error',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    getAllUserTransactions({ commit }) {
      let token = localStorage.getItem('token')

      axios({
        url: `${base_url}/transaction/one`,
        method: 'GET',
        headers: { token }
      })
        .then(response => {
          console.log(response.data.data, "<<<<<<<<<ini dari store getAllUserTransaction")
          let allTransactions = response.data.data
          commit('all_user_transaction', allTransactions)
        })
        .catch(err => {
          console.log(err)
        })
    },
  updateTransaction({ commit, dispatch }, payload){
    console.log("masuk ke store updateTransaction")
    console.log(payload,"<<<<< ini updateTransaction store")
    let token = localStorage.getItem('token')
    axios({
      url: `${base_url}/transaction/${payload}`,
      method: 'PATCH',
      data: {
        arrived_status: true
      },
      headers: {
        token
      }
    })
      .then(response => {
        console.log("bisa update")
        console.log(response.data.data)
        Vue.swal.close()
        Vue.swal.fire({
          type: 'success',
          title: 'Yeeey we happy you already get the product',
          showConfirmButton: false,
          timer: 2000
        })
        let allTransactions = response.data.data
        commit('all_user_transaction', allTransactions)
      })
      .catch(err => {
        // console.log(err.response.data.message)
        let message = err.response.data.message
        Vue.swal.fire({
          type: 'error',
          title: message,
          showConfirmButton: false,
          timer: 2000
        })
      })
  }
}
})
