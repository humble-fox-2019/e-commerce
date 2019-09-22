import Vue from 'vue';
import Vuex from 'vuex';
import myAxios from './configs/myAxios'

Vue.use(Vuex);

const admins = ['admin@gmail.com']

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    products: [],
    cart: {},
    onProgress: [],
    history: [],
    totalPrice: 0,
    isAdmin: false,
    isLoading: false
  },
  mutations: {
    auth_request(state) {
      state.isLoading = true
      state.status = 'loading'
    },
    auth_finished(state) {
      state.isLoading = false
    },
    auth_success(state, payload) {
      state.isLoading = false
      state.status = 'success'
      state.token = payload.token
      state.user = payload.user
      if (admins.includes(payload.user.email)) state.isAdmin = true
    },
    auth_error(state) {
      state.isLoading = false
      state.status = 'error'
    },
    auth_loggedBack(state, payload) {
      state.isLoading = false
      state.user = payload.user
      if (admins.includes(payload.user.email)) state.isAdmin = true
    },
    logout(state) {
      state.status = ''
      state.token = ''
      state.isAdmin = false
    },
    addToProductsState(state, payload) {
      state.products = payload.products
    },
    addToCartState(state, payload) {
      state.cart = payload.cart
    },
    calcTotalPrice(state, payload) {
      // let tempTotal = payload.cart.items.reduce((a, v) => {
      //   a + v.productId.price
      // })
      let tempTotal = 0

      for (let i = 0; i < payload.cart.items.length; i++) {
        let item = payload.cart.items[i]
        tempTotal += (item.productId.price * item.qty)
      }

      state.totalPrice = tempTotal
    },
    addToOnProgressState(state, payload) {
      state.onProgress = payload.carts
    },
    addToHistoryState(state, payload) {
      state.history = payload.carts
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        myAxios
          .post('/users/login', user)
          .then(({ data }) => {
            const token = data.token
            const user = data.user
            const payload = {
              user, token
            }
            localStorage.setItem('token', token)
            myAxios.defaults.headers.token = token
            commit('auth_success', payload)
            resolve(data)
          })
          .catch(err => {
            // console.log(err.response.data.errors)
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err.response.data.errors)
          })
      })
    },

    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        myAxios
          .post('/users/register', user)
          .then(({ data }) => {
            const token = data.token
            const user = data.user
            const payload = {
              user, token
            }
            localStorage.setItem('token', token)
            myAxios.defaults.headers.token = token
            commit('auth_success', payload)
            resolve(data)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err.response.data.errors)
          })
      })
    },

    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete myAxios.defaults.headers.token
        resolve()
      })
    },

    checkToken({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.token) {
          commit('auth_request')
          myAxios.defaults.headers.token = state.token
          myAxios.get('/users/')
            .then(({ data }) => {
              const user = data
              const payload = {
                user
              }
              commit('auth_loggedBack', payload)
              resolve(data)
            })
            .catch(err => {
              reject(err.response.data.errors)
            })
        } else {
          reject()
        }
      })
    },

    // products related
    addToCart({ commit }, payload) {
      return new Promise((resolve, reject) => {
        // console.log(payload)
        // myAxios.defaults.headers.token = state.token
        myAxios.patch('/carts/add-to-cart', { productId: payload.id, qty: payload.qty })
          .then(({ data }) => {
            console.log(data)
          })
          .catch(err => {
            console.log(err)
          })
      })
    },

    fetchProducts({ commit }) {
      commit('auth_request')
      myAxios
        .get('/products')
        .then(({ data }) => {
          commit('auth_finished')
          commit('addToProductsState', data)
        })
        .catch(err => {
          commit('auth_finished')
          console.log(err)
        })
    },

    // carts related
    createCart({ commit, dispatch }) {
      commit('auth_request')
      myAxios.get('/carts')
        .then(({ data }) => {
          commit('auth_finished')
          console.log(data)
          dispatch('fetchCart')
          // commit('calcTotalPrice', data)
          // commit('addToCartState', data)
        })
        .catch(err => {
          commit('auth_finished')
          console.log(err)
        })
    },

    deleteCart({ commit, dispatch }, payload) {
      commit('auth_request')
      // console.log(payload)
      myAxios.delete('/carts/' + payload)
        .then(({ data }) => {
          commit('auth_finished')
          console.log(data)
          dispatch('createCart')
        })
        .catch(err => {
          commit('auth_finished')
          console.log(err)
        })
    },

    fetchCart({ commit }) {
      commit('auth_request')
      myAxios.get('/carts/populate')
        .then(({ data }) => {
          commit('auth_finished')
          // console.log(data)
          commit('calcTotalPrice', data)
          commit('addToCartState', data)
        })
        .catch(err => {
          commit('auth_finished')
          console.log(err)
        })
    },

    removeFromCart({ commit, dispatch }, payload) {
      commit('auth_request')
      // console.log(payload)
      myAxios.patch('/carts/remove-from-cart/' + payload)
        .then(({ data }) => {
          commit('auth_finished')
          dispatch('fetchCart')
        })
        .catch(err => {
          commit('auth_finished')
          console.log(err)
        })
    },

    submitCart({ commit, dispatch }, payload) {
      commit('auth_request')
      myAxios.patch('/carts/progress/' + payload, { onProgress: true })
        .then(({ data }) => {
          commit('auth_finished')
          dispatch('fetchCart')
        })
        .catch(err => {
          commit('auth_finished')
          console.log(err)
        })
    },

    fetchOnProgress({ commit }, payload) {
      commit('auth_request')
      myAxios.get('/carts/on-progress')
        .then(({ data }) => {
          commit('auth_finished')
          commit('addToOnProgressState', data)
        })
        .catch(err => {
          commit('auth_finished')
          console.log(err)
        })
    },

    confirmBuy({ commit, dispatch }, payload) {
      commit('auth_request')
      myAxios.patch('/carts/progress/' + payload, { status: true })
        .then(({ data }) => {
          commit('auth_finished')
          dispatch('fetchOnProgress')
        })
        .catch(err => {
          commit('auth_finished')
          console.log(err)
        })
    },

    fetchHistory({ commit }) {
      commit('auth_request')
      myAxios.get('/carts/history')
        .then(({ data }) => {
          commit('auth_finished')
          commit('addToHistoryState', data)
        })
        .catch(err => {
          commit('auth_finished')
          console.log(err)
        })
    }
  },
  getters: {
    isLogin: state => !!state.token,
    authStatus: state => state.status,
    isLoading: state => state.isLoading,
    user: state => state.user,
    token: state => state.token,
    isAdmin: state => state.isAdmin,
    products: state => state.products,
    cart: state => state.cart,
    totalPrice: state => state.totalPrice,
    onProgress: state => state.onProgress,
    history: state => state.history
  }
});
