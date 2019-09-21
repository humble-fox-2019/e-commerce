import Vue from 'vue';
import Vuex from 'vuex';
import myAxios from './configs/myAxios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    isLoading: false

  },
  mutations: {
    auth_request(state) {
      state.isLoading = true
      state.status = 'loading'
    },
    auth_success(state, payload) {
      state.isLoading = false
      state.status = 'success'
      state.token = payload.token
      state.user = payload.user
    },
    auth_error(state) {
      state.isLoading = false
      state.status = 'error'
    },
    auth_loggedBack(state, payload) {
      state.isLoading = false
      state.user = payload.user
    },
    logout(state) {
      state.status = ''
      state.token = ''
    },
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
              const user = data.user
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
    }
  },
  getters: {
    isLogin: state => !!state.token,
    authStatus: state => state.status,
    isLoading: state => state.isLoading,
    user: state => state.user,
    token: state => state.token
  }
});
