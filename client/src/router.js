import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';
import MainPage from './views/mainPage.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home,
    // },
    {
      path: '/',
      name: 'loginRegister',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */
        '../src/views/registerLogin.vue'),
    },
    {
      path: '/mainpage',
      name: 'mainpage',
      component: MainPage
    }
  ],
});
