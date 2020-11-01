import Vue from 'vue'
import Router from 'vue-router'
import Detail from './views/Detail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('./views/Products.vue'),
      children: [
        {
          path: '',
          name: 'ProductList',
          component: () => import('./views/ProductList.vue')
        },
        {
          path: 'products/:id',
          name: 'detailProduct',
          component: Detail
        }
      ]
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./views/Cart.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('./views/Auth.vue'),
      children: [
        {
          path: 'signup',
          name: 'signup',
          component: () => import('./views/Signup.vue')      
        },
        {
          path: 'signin',
          name: 'signin',
          component: () => import('./views/Signin.vue')
        }
      ]
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: () => import('./views/Transactions.vue')
    }
    // {
    //   path: '/products',
    //   component: () => import('./views/Products.vue'),
    //   children: [
    //     {
    //       path: '',
    //       name: 'ProductList',
    //       component: () => import('./views/ProductList.vue')
    //     },
    //     {
    //       path: ':id',
    //       name: 'detailProduct',
    //       component: Detail
    //     }
    //   ]
    // }
  ]
})
