import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Front',
      component: () => import(/* webpackChunkName: "Front" */ './views/Front.vue'),
    },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "Home" */ './views/Home.vue'),
      children: [
        {
          path: 'dogs',
          name: 'home.dog',
          component: () => import(/* webpackChunkName: "dog" */ './views/Dog.vue'),
        },
        {
          path: 'cart',
          name: 'home.cart',
          component: () => import(/* webpackChunkName: "cart" */ './views/Cart.vue'),
        },
        {
          path: 'orders',
          name: 'home.order',
          component: () => import(/* webpackChunkName: "order" */ './views/Order.vue'),
        }
      ]
    },
  ],
});
