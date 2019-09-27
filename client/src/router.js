import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/',
      name: 'About Use',
      component: () => import('./views/AboutUs.vue')
    },
    {
      path: '/products',
      name: 'Products',
      component: () => import('./views/Products.vue')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('./views/Admin.vue'),
      beforeEnter (to, from, next) {
        if (!localStorage.token) {
          next({
            name: 'Login'
          })
        } else {
          if (localStorage.role === 'admin') {
            next()
          } else {
            next({
              name: 'Products'
            })
          }
        }
      }
    },
    {
      path: '/admin/create',
      name: 'create',
      component: () => import('./views/CreateProd.vue'),
      beforeEnter (to, from, next) {
        if (!localStorage.token) {
          next({
            name: 'Login'
          })
        } else {
          if (localStorage.role === 'admin') {
            next()
          } else {
            next({
              name: 'Products'
            })
          }
        }
      }
    }
  ]
})
