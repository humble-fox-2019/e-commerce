<template>
  <div>
    <div class="header" v-if="$store.state.role == 'costumer'">
      <div class="logo">
        <img src="../assets/tokopadia.png" alt="" srcset="">
      </div>
      <div class="search-box">
        <form @submit.prevent="searchProduct()">
          <div class="input-search">
            <input
              type="text"
              placeholder="Search product..."
              id="search"
              @keyup="searchProduct($event)" @blur="hideSearch()" v-model="productSearch" maxlength="25">
            <div class="product-list-search" v-if="isSearch">
              <span>Showing result for : <b>{{ textSearch }}</b></span>
              <transition name="fade">
                <div class="product-search-loading" v-if="isLoading">
                  <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
                <div class="list-product" v-else>
                  <div v-for="(product, index) in products" :key="index" @click="showProduct(product._id)">
                    <img :src="product.image">
                    <span> {{ product.name }} </span>
                  </div>
                </div>
              </transition>
            </div>
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
            <span>{{ $store.state.user.carts.length }}</span>
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

import axios from '../api/server'

export default {
  name: 'Header',
  data() {
    return {
      productSearch: '',
      textSearch: '',
      products: [],
      isLoading: false,
      isSearch: false,
    }
  },
  methods: {
    showConfirmationLogout() {
      this.$store.commit('toggleConfirm')
    },
    searchProduct(e) {
      if((e.keyCode >= 48 && e.keyCode <= 90)) {
        if(this.productSearch.length >= 3){
          this.isSearch = true
          this.isLoading = true
          axios.get(`/product/search?name=${this.productSearch}`)
          .then(({data}) => {
            this.textSearch = this.productSearch
            this.products = data.products
          })
          .catch(err => {
            this.products = []
          })
          .finally(() => {
            this.isLoading = false
          })
        }else{
          this.isSearch = false
        }
      }
    },
    hideSearch() {
      if(this.productSearch.length > 0){

      }else{
        this.isSearch = false
      }
    },
    showProduct(id) {
      this.$router.push(`/product/${id}`)
      this.isSearch = false
      this.productSearch = ''
      this.products = []
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
  border-radius: 5px;
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
  background-color: #dddddd;
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
.search-box {
  position: relative;
}
.search-box form{
  position: relative;
  width: 300px;
}
.search-box form label{
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}
.search-box form input{
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  background-color: #f1efec;
  border-radius: 10px;
}
.search-box form input:focus{
  outline: none;
}
.product-list-search{
  background-color: #f1f1f1;
  position: absolute;
  z-index: 999;
  top: 120%;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(255, 146, 146, 0.2);
}
.product-list-search > span{
  display: block;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.list-product{
  max-height: 150px;
  overflow-y: auto;
}
.list-product > div{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  cursor: pointer;
  padding: 5px;
}
.list-product > div:not(:last-child) {
  border-bottom: 1px solid #b6b6b6;
}
.list-product > div:hover{
  color: rgb(180, 180, 180);
}
.list-product > div img{
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 20px;
}
.list-product > div span{
  font-size: 12pt;
  font-weight: bold;
}
.lds-ellipsis {
  margin: auto;
  display: block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ellipsis div {
  position: absolute;
  top: 27px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: rgb(55, 221, 77);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
  left: 6px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 6px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 26px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 45px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
}
.fade-enter-active{
  animation: shake .5s;
}
.fade-leave-active{
  animation: fadeIn .01s reverse;
}
</style>
