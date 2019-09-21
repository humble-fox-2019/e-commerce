import Vue from 'vue';
import Router from 'vue-router';
import FrontEnd from './views/template/FrontEnd.vue';
import Cart from './views/Cart.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'frontEnd',
      component: FrontEnd,
      children: [
        {
          path: '/',
          name: 'productList',
          component: () => import('./views/products/ProductList.vue')
        },
        {
          path: '/product/:id',
          name: 'productDetail',
          component: () => import('./views/products/ProductDetail.vue')
        }
      ]
    },
    {
      path: '/cart',
      name: 'frontEnd',
      component: FrontEnd,
      children: [
        {
          path: '/cart',
          name: 'cart',
          component: Cart,
        }
      ]
    },
    {
      path: '/cart',
      name: 'frontEnd',
      component: FrontEnd,
      children: [{
        path: '/login',
        name: 'login',
        component: Login,
      }]
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
