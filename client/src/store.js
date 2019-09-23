import Vue from 'vue'
import Vuex from 'vuex'
import md5 from 'md5'
import axios from './config/axios'
import Cart from './modules/Cart'
import User from './modules/User'

Vue.use(Vuex)

const localhost = "http://localhost:3000"
const store = new Vuex.Store({
  modules: {
    Cart, User
  },
  state: {
    products: [],
    admin: true,
    login: true,
    username: "tigor",
    userEmail: "tigor.hutasuhut@gmail.com",
    cart: []
  },
  mutations: {
    fillProducts(state, payload) {
      state.products = payload
    },
    clearProducts(state) {
      state.products = []
    },
    logout(state) {
      state.admin = false;
      state.login = false;
      state.cart = []
    },
    login(state, payload) {
      payload.role === 'Admin' ? state.admin = true : state.admin = false;
      state.login = true;
      state.username = payload.username;
      state.userEmail = payload.email;
    }

  },
  actions: {
    getProducts({ commit }) {
      axios.get(localhost + '/products/')
        .then(({ data }) => {
          commit('fillProducts', data)
        }).catch((err) => {
          console.log(err)
        });
    },

  },
  getters: {
    gravatar() {
      const base = 'https://www.gravatar.com/avatar/'
      const hash = md5(store.state.userEmail)
      return base + hash
    }
  }
})

export default store