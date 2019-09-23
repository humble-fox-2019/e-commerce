import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Home,
      children: [
        { 
          path : '/' ,
          name : "ListProduct",
          component: () =>
            import(/* webpackChunkName: "login" */ "./views/ListProduct.vue")
        },
        {
          path:"/detail/:id",
          name : "detail",
          component: () => 
            import(/* webpackChunkName: "login" */ "./views/Detail.vue")
        },
        {
          path:"/cart",
          name : "Cart",
          component: () => 
            import(/* webpackChunkName: "login" */ "./views/UserCart.vue")
        },
        {
          path:"/transactions",
          name: "Transactions",
          component: () =>
            import(/* webpackChunkName: "login" */ "./views/TransactionList.vue")
        }
      ]
    },
    {
      path: "/login",
      name : "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue")
    },
    {
      path:"/register",
      name : "register",
      component: () => 
        import(/* webpackChunkName: "login" */ "./views/Register.vue")
    },
    // {
    //   path:"/detail/:id",
    //   name : "detail",
    //   component: () => 
    //     import(/* webpackChunkName: "login" */ "./views/Detail.vue")
    // }
  ]
});
