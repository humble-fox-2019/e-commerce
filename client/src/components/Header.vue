<template>
  <div>
    <div class="header" v-if="$store.state.role == 'costumer'">
      <div class="logo">
        <img src="../assets/tokopadia.png" alt="" srcset="">
      </div>
      <div class="search-box">
        <form>
          <div class="input-search">
            <label for="search">
              <i class="fa fa-search" aria-hidden="true"></i>
            </label>
            <input
              type="text"
              placeholder="Search product"
              id="search">
          </div>
        </form>
      </div>
      <div class="user" v-if="$store.state.isLogin">
        <router-link to="/">Home</router-link>
        <router-link to="/product">Product</router-link>
        <div class="divider"></div>
        <router-link to="/account">My Account</router-link>
        <h3>{{ $store.state.user.name }}</h3>
        <div class="cart">
          <i class="fas fa-shopping-cart"></i>
          <div class="cart-number">
            <span>20</span>
          </div>
        </div>
        <div class="logout" @click="showConfirmationLogout()">
          <span><i class="fas fa-sign-out-alt"></i> Signout</span>
        </div>
      </div>
      <div class="menu" v-else>
        <router-link to="/">Home</router-link>
        <router-link to="/product">Product</router-link>
        <router-link to="/signin">Signin</router-link>
        <router-link to="/signup">Signup</router-link>
      </div>
    </div>
    <div class="header" v-else>
      <div class="logo">
        <img src="../assets/tokopadia.png" alt="" srcset="">
      </div>
      <div class="user">
        <div class="menu-store">
          <router-link to="/myproduct">My product</router-link>
          <router-link to="/new-product">Add new product</router-link>
          <router-link to="/transaction">Transaction</router-link>
        </div>
        <div class="divider"></div>
        <h3>{{ $store.state.seller.name }}</h3>
        <div class="logout" @click="showConfirmationLogout()">
          <span><i class="fas fa-sign-out-alt"></i> Signout</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    showConfirmationLogout() {
      this.$store.commit('toggleConfirm')
    }
  }
}
</script>

<style scoped>

.header{
  max-width: 1100px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px auto;
  padding: 20px;
  border-bottom: 1px solid rgba(0,0,0,.1);
}
.logo img{
  width: 150px;
}
.input-search{
  width: 300px;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 4px 2px rgba(0,0,0,.1);
}
.input-search input{
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  border: none;
  font-size: 12pt;
}
.input-search input:focus{
  outline: none;
}
.input-search label{
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  color: rgba(0,0,0,.3);
}
.menu a, .user a{
  display: inline-block;
  padding: 10px;
  border-radius: 5px;
  color: rgb(61, 61, 61);
}
.router-link-exact-active{
  font-weight: bold;
  background-color: rgb(220, 255, 200);
  color: #43ca34;
}
.menu a:hover, .user a:hover{
  background-color: rgb(220, 255, 200);
}
.menu a:not(:first-child){
  margin-left: 20px;
}
.user{
  display: flex;
  align-items: center;
}
.user > *:not(:last-child) {
  margin-right: 10px;
}
.user h3{
  font-size: 12pt;
}
.cart{
  background-color: #43ca34;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  position: relative;
}
.cart i{
  color: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.cart .cart-number{
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #43ca34;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ffffff;
}
.cart-number span{
  font-size: 9pt;
  font-weight: bold;
  color: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);  
}
.divider{
  margin: 0 20px;
  width: 1px;
  height: 30px;
  border-right: 1px solid rgba(0,0,0,.1);
}
.logout{
  background-color: #afafaf;
  margin-left: 20px;
  padding: 10px;
  border-radius: 5px;
  font-size: 10pt;
  cursor: pointer;
  color: #5e5e5e;
}
.logout:hover{
  background-color: #d3d3d3;
}
</style>
