<template>
  <div class="signup">
    <form @submit.prevent="signup()" spellcheck="off">
      <h1>Open your store !</h1>
      <transition name="shake">
        <div class="error" v-if="errors.length > 0">
          <ul>
            <li v-for="(error, index) in errors" :key="index"> {{ error }} </li>
          </ul>
        </div>
      </transition>
      <div>
        <div class="input-group">
          <label for="name">Store name</label>
          <input type="text" required v-model="name" >
        </div>
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" required v-model="email" >
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" required v-model="password" >
        </div>
        <div class="input-small">
          <div>
            <label for="province">Province</label>
            <select name="province" v-model="province">
              <option value="">-</option>
              <option value="Sumatera utara">Sumatera Utara</option>
            </select>
          </div>
          <div>
            <label for="city">City</label>
            <select name="city" v-model="city">
              <option value="">-</option>
              <option value="Medan">Medan</option>
              <option value="Binjai">Binjai</option>
            </select>
          </div>
        </div>
        <div class="input-submit">
          <button type="submit" :disabled="btnState">{{btnText}}</button>
        </div>
        <div class="form-footer">
          <p>Already have a store account ?</p>
          <router-link to="/store-signin">Signin here</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

import axios from '../api/server.js'

export default {
  name: 'StoreSignup',
  components: {
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      province: '',
      city: '',
      errors: [],
      btnText: 'OPEN STORE',
      btnState: false
    }
  },
  methods: {
    signup() {
      this.btnText = 'Loading...'
      this.btnState = true

      axios.post('/store/signup', {
        name: this.name,
        email: this.email,
        password: this.password,
        province: this.province,
        city: this.city
      })
      .then(({data}) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', data.role)
        this.setDefaultState()
        this.$store.dispatch('getStoreData')
      })
      .catch(err => {
        this.errors = err.response.data.errors
        setTimeout(() => {
          this.errors = []
        }, 3000)
      })
    },
    setDefaultState() {
      this.name = ''
      this.email = ''
      this.password = ''
      this.province = ''
      this.city = ''
      this.btnText = 'OPEN STORE'
      this.btnState = false
    }
  }
}
</script>

<style scoped>
.signup{
  max-width: 400px;
  padding: 20px;
  margin: 50px auto;
}
.signup h1{
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0,0,0,.1);
  color: #43ca34;
}
.input-group{
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
.input-group label{
  margin-bottom: 5px;
}
.input-group input{
  padding: 10px;
  font-size: 12pt;
  border: 2px solid #43ca34;
  border-radius: 5px;
}
.input-group input:focus{
  outline: none;
}
.input-submit button{
  padding: 15px 10px;
  font-size: 10pt;
  font-weight: bold;
  color: #ffffff;
  background-color: #43ca34;
  border: none;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}
.input-submit button:hover{
  background-color: #5adb4c;
}
.input-submit button:focus{
  outline: none;
}
.input-submit button:active{
  transform: scale(0.95);
}
.input-submit button:disabled{
  background-color: #91a08f;
  opacity: 0.6;
  cursor: default;
}
.error{
  margin-bottom: 20px;
}
.error ul{
  list-style: none;
}
.error li{
  color: #fa1a1a;
}
.shake-enter-active{
  animation: shake .5s;
}
.shake-leave-active{
  animation: fadeOut .2s;
}
.input-small{
  display: flex;
}
.input-small > div:first-child{
  margin-right: 10px;
}
.input-small > div{
  display: flex;
  flex-direction: column;
  width: 100%;
}
.input-small > div label{
  margin-bottom: 5px;
}
.input-small select{
  padding: 10px;
  border: none;
  background-color: #ffffff;
  font-size: 12pt;
  color: #43ca34;
  border: 2px solid #43ca34;
  border-radius: 5px;
  width: 100%;
}
.input-small select:focus{
  outline: none;
}
.form-footer{
  text-align: center;
  margin-top: 20px;
}
.form-footer a{
  font-size: 12pt;
  font-weight: bold;
  color: #43ca34;
}
</style>
