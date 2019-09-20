<template>
  <div class="signin">
    <form @submit.prevent="signup()">
      <h1>Signup</h1>
      <transition name="shake">
        <div class="error" v-if="errors.length > 0">
          <ul>
            <li v-for="(error, index) in errors" :key="index"> {{ error }} </li>
          </ul>
        </div>
      </transition>
      <div>
        <div class="input-group">
          <label for="name">Name</label>
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
        <div class="input-submit">
          <button type="submit" :disabled="btnState">{{btnText}}</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

import axios from '../api/server.js'

export default {
  name: 'Signup',
  components: {
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      errors: [],
      btnText: 'SIGN UP',
      btnState: false
    }
  },
  methods: {
    signup() {
      this.btnText = 'Loading...'
      this.btnState = true

      axios.post('/user/signup', {
        
      })
    },
    setDefaultState() {
      this.name = ''
      this.email = ''
      this.password = ''
      this.errors = []
      this.btnText = 'SIGN UP'
      this.btnState = false
    }
  }
}
</script>

<style scoped>
.signin{
  max-width: 350px;
  padding: 20px;
  margin: 50px auto;
}
.signin h1{
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
</style>
