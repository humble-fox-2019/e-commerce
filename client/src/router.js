import Vue from 'vue'
import Router from 'vue-router'
import Homepage from './views/Homepage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: Homepage
    },
    {
      path: '/nike',
      name: 'itemList',
      component: () => import('./views/Nike.vue')
    },
    {
      path: '/adidas',
      name: 'itemList',
      component: () => import('./views/Adidas.vue')
    },
    {
      path: '/newbalance',
      name: 'itemList',
      component: () => import('./views/Newbalance.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component:() => import('./views/Cart.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import ('./views/Register.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import ('./views/Admin.vue'),
      children: [
        {
          path: ':id',
          component: () => import ('./components/ItemSetting.vue')
        }
      ]
    }
  ]
})
