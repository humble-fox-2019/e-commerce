import Vue from "vue";
import Router from "vue-router";
import Landing from "@/views/Landing.vue";
import Home from "@/views/Home.vue";
import Cart from "@/views/Cart.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import ProductAdd from "@/views/Product/Add.vue"
import ProductList from "@/views/Product/List.vue"

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "landing",
      component: Landing
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      children: [
        {
          path: "list",
          component: ProductList
        },
        {          
          path: "add",
          component: ProductAdd
        },
      ]
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
});
