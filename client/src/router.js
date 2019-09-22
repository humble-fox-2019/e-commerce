import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Product from './views/Product'
import Signin from './views/Signin'
import Signup from './views/Signup'
import StoreSignin from './views/StoreSignin'
import StoreSignup from './views/StoreSignup'
import MyProduct from './views/MyProduct'
import NewProduct from './views/AddNewProduct'
import Transaction from './views/Transaction'
import UpdateProduct from './views/UpdateProduct'
import ProductDetail from './views/ProductDetail'
import UserPage from './views/UserPage'
import UserDashboard from './views/UserDashboard'
import UserCart from './views/UserCart'
import UserOrder from './views/UserOrder'

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
      path: '/product',
      name: 'product',
      component: Product
    },
    {
      path: '/product/:id',
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/open-store',
      name: 'StoreSignup',
      component: StoreSignup
    },
    {
      path: '/store-signin',
      name: 'StoreSignin',
      component: StoreSignin
    },
    {
      path: '/account',
      component: UserPage,
      beforeEnter: (to, from, next) =>  {
        if(localStorage.getItem('token') && localStorage.getItem('role') == 'costumer') {
          next()
        }else {
          next('/signin')
        }
      },
      children: [
        {
          path: '',
          name: 'UserDashboard',
          component: UserDashboard
        },
        {
          path: 'cart',
          name: 'UserCart',
          component: UserCart
        },
        {
          path: 'order',
          name: 'UserOrder',
          component: UserOrder
        }
      ]
    },
    {
      path: '/myproduct',
      name: 'MyProduct',
      component: MyProduct,
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('token') && localStorage.getItem('role') == 'store') {
          next()
        }else {
          next('/')
        }
      }
    },
    {
      path: '/new-product',
      name: 'NewProduct',
      component: NewProduct,
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('token') && localStorage.getItem('role') == 'store') {
          next()
        }else {
          next('/')
        }
      }
    },
    {
      path: '/transaction',
      name: 'Transaction',
      component: Transaction,
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('token') && localStorage.getItem('role') == 'store') {
          next()
        }else {
          next('/')
        }
      }
    },
    {
      path: '/update/:id',
      name: 'UpdateProduct',
      component: UpdateProduct,
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('token') && localStorage.getItem('role') == 'store') {
          next()
        }else {
          next('/')
        }
      }
    }
  ]
})
