import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userData: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUserData(state, userData) {
      state.userData = userData
    }
  },
  actions: {

  }
})
