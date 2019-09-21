import Vue from 'vue';
import store from './store'
import Router from 'vue-router';
import Home from './views/Home.vue'
import SignUp from './views/SignUp.vue';
import Login from './views/Login.vue';
import Products from './views/Products.vue';
import ProductDetail from './components/ProductDetail.vue';
import Carts from './views/Carts.vue';
import AddProduct from './views/AddProduct.vue';
import Users from './views/Users.vue'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/signUp', name: 'signUp', component: SignUp },
    { path: '/add-product', name: 'add-product', component: AddProduct },
    {
      path: '/products', name: 'products', component: Products,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/products/:id',
          name: 'productDetail',
          component: ProductDetail
        }
      ]
    },
    {
      path: '/users/:id', name: 'users', component: Users,
      children: [
        { path: '/carts', name: 'carts', component: Carts }
      ]
    },
    { path: '*', redirect: '/' }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLogin) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
