
<template>
  <div class="main-content">
    <Navbar></Navbar>
    <div class="content shadow-lg p-0 container">
      <div class="d-flex flex-column">
        <div style="z-index: 10;position: relative">
          <Ads></Ads>
        </div>
      </div>
      <div style="z-index: 10;position: relative;top: 56px;" class="d-flex flex-column">
        <MainButton @gotodog="gotodog()" @gotocart="gotocart()" @gotoorder="gotoorder()"></MainButton>
      </div>
      <div style="z-index: 10;position: relative;top: 56px;" class="d-flex flex-column">
        <router-view></router-view>
        <!-- <Dog v-if="dogPage"></Dog>
        <Cart v-if="cartPage"></Cart>
        <Order v-if="orderPage"></Order>-->
      </div>
    </div>
  </div>
</template>

<script>
import Ads from "../components/Ads";
import Navbar from "../components/Navbar";
import MainButton from "../components/MainButton";
import Dog from "../views/Dog.vue";
import Cart from "../views/Cart.vue";
import Order from "../views/Order.vue";
export default {
  data() {
    return {
      dogPage: true,
      cartPage: false,
      orderPage: false
    };
  },
  components: {
    Navbar,
    Ads,
    MainButton,
    Dog,
    Cart,
    Order
  },
  methods: {
    gotodog() {
      this.dogPage = true;
      this.cartPage = false;
      this.orderPage = false;
    },
    gotocart() {
      this.dogPage = false;
      this.cartPage = true;
      this.orderPage = false;
    },
    gotoorder() {
      this.dogPage = false;
      this.cartPage = false;
      this.orderPage = true;
    }
  }
};
</script>

<style scoped>
.main-content {
  min-height: 100vh;
  background-image: url("../assets/bgmain.jpeg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.content {
  background-color: whitesmoke;
  min-height: 100vh;
}
.pages {
  position: relative;
  top: 56px;
}
</style>