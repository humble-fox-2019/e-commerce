<template>
  <div class="notification">
    <div class="notif">
      <h2>Success add to cart</h2>
      <button class="checkout" @click="checkout()">Checkout</button>
      <button class="continue" @click="continueShopping()">Continue shopping</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddToCartNotification',
  methods: {
    checkout() {
      this.$router.push('/account/cart')
      this.$store.commit('toggleNotifAdd')
    },
    continueShopping() {
      this.$store.commit('toggleNotifAdd')
    }
  }
}
</script>

<style scope>

.notification{
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,.2);
  width: 100%;
  height: 100vh;
  z-index: 999;
}
.notif{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 5px;
  padding: 30px 20px 20px;
  text-align: center;
  box-shadow: 0 0 20px 2px rgba(0,0,0,.2);
}
.notif h2{
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
  color: #43ca34;
}
.notif h2::after{
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 2px;
  border-radius: 5px;
  background-color: #43ca34;
}
.notif button{
  padding: 10px;
  margin: 10px;
  border: none;
  font-size: 10pt;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
}
.checkout{
  background-color: #43ca34;
  color: #ffffff;
  padding: 12px 30px !important;
}
.continue{
  background-color: #ffffff;
  border: 2px solid #43ca34 !important;
  color: #43ca34;
}
</style>
