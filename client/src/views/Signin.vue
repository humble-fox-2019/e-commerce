<template>
  <div class="signin">
    <form @submit.prevent="signin()" spellcheck="off">
      <h1>Signin</h1>
      <transition name="shake">
        <div class="error" v-if="errors.length > 0">
          <ul>
            <li v-for="(error, index) in errors" :key="index"> {{ error }} </li>
          </ul>
        </div>
      </transition>
      <div>
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
  name: 'Signin',
  components: {
  },
  data() {
    return {
      email: '',
      password: '',
      errors: [],
      btnText: 'SIGN IN',
      btnState: false
    }
  },
  methods: {
    signin() {
      this.btnText = 'Loading...'
      this.btnState = true

      axios.post('/user/signin', {
        email: this.email,
        password: this.password
      })
      .then(({data}) => {
        localStorage.setItem('token', data.token)
        this.$store.dispatch('getUserData')
        this.$router.push('/product')
      })
      .catch(err => {
        this.errors = err.response.data.errors
        setTimeout(() => {
          this.errors = []
        }, 3000)
      })
      .finally(() => {
        this.setDefaultState()
      })
    },
    setDefaultState() {
      this.email = ''
      this.password = ''
      this.btnText = 'SIGN IN'
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
.shake-enter-active{
  animation: shake .5s;
}
.shake-leave-active{
  animation: fadeOut .2s;
}
</style>
