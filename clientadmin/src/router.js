import Vue from 'vue';
import Router from 'vue-router';
import Sign from './views/Sign.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/add',
      name: 'add',
      // route level code-splitting
      // this generates a separate chunk (add.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "add" */ './views/Add.vue'),
    },
    {
      path: '/dogs',
      name: 'dogs',
      // route level code-splitting
      // this generates a separate chunk (dogs.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "dogs" */ './views/Dog.vue'),
    },
    {
      path: '/transaction',
      name: 'transaction',
      // route level code-splitting
      // this generates a separate chunk (transactions.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "transactions" */ './views/Transaction.vue'),
    },
  ],
});
