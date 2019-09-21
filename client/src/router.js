import Vue from 'vue';
import Router from 'vue-router';
import FrontEnd from './views/template/FrontEnd.vue';
import Cart from './views/Cart.vue';
import Login from './views/Login.vue';
import Registration from './views/Registration.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
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
      path: '/login',
      component: FrontEnd,
      children: [{
        path: '/login',
        name: 'login',
        component: Login,
      }]
    },
    {
      path: '/registration',
      component: FrontEnd,
      children: [{
        path: '/registration',
        name: 'registration',
        component: Registration
      }]
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
