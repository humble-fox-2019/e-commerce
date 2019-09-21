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
    isShowConfirm: false
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
    }
  },
  actions: {
    getUserData(context) {
      axios.get('/user/get-user-data', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        context.commit('setUserData', data)
        router.push('/product')
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
    }
  }
})
