import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Shop from './views/Shop.vue'
import Detail from './components/Detail.vue'
import Cart from './components/Cart.vue'
import Account from './views/Account.vue'
import Store from './components/Store.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop,
      children: [{
        path: 'id',
        name: 'detail',
        component: Detail,
      }, {
        path: 'cart',
        name: 'cart',
        component: Cart
      }]
    },
    {
      path: '/user',
      name: 'user',
      component: Account,
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login
        }, {
          path: 'register',
          name: 'register',
          component: Register
        }
      ]
    },
    {
      path: '/store',
      name: 'store',
      component: Store
    }
  ]
})
