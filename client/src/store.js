import Vue from "vue";
import Vuex from "vuex";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    isAdmin: false,
    products: [],
    carts: []
  },
  getters: {},
  mutations: {
    setToken(state, payload) {
      state.token = payload.token;
    },
    removeToken(state, payload) {
      state.token = "";
      state.isAdmin = false;
    },
    setAdmin(state, payload) {
      state.isAdmin = true;
    },
    initProduct(state, payload) {
      let products = [];
      for (let i = 0; i < payload.data.length; i++) {
        const product = payload.data[i];
        products.push(product);
      }
      state.products = products;
    },
  },
  actions: {}
});
