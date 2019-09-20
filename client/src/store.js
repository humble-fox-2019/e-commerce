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
    isLogin: false,
    isShowConfirm: false
  },
  mutations: {
    setUserData(state, payload) {
      state.user = payload
      state.isLogin = true
    },
    clearUserData(state) {
      state.user = {
        name: ''
      }
    },
    signout(state) {
      localStorage.clear()
      state.isLogin = false
      this.clearUserData
      state.isShowConfirm = false
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
        // router.push('/signin')
      })
    }
  }
})
