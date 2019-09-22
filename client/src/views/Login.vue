<template>
  <div class="box">
    <div>
      <img src="../assets/chill.jpg" alt srcset />
    </div>
    <div class="circle">
      <v-form action class="formLogin" @submit.prevent="loginMe">
        <h2>Login</h2>
        <br />
        <label for>Email</label>
        <v-text-field type="email" class="my-text-style" v-model="email"></v-text-field>
        <label for>Password</label>
        <v-text-field class="my-text-style" type="password" v-model="password"></v-text-field>
        <br />
        <v-btn type="submit">Submit</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const baseUrl = 'http://localhost:3000'

export default {
  data () {
    return {
      message: 'login',
      email: '',
      password: ''
    }
  },
  methods: {
    loginMe () {
      axios({
        method: 'post',
        url: baseUrl + '/users/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(response => {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('role', response.data.role)
          this.$emit('newToken')
          this.email = ''
          this.password = ''
        })
        .catch(err => {
          let string = err.response.data.msg
          this.$toastr.Add({
            title: 'Ups something wrong',
            msg: string,
            clickClose: false,
            timeout: 2000,
            position: 'toast-top-center',
            type: 'warning',
            preventDuplicates: true,
            style: {
              backgroundColor: '#e96767',
              width: '525px',
              'font-size': '21pt'
            }
          })
        })
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: "Be Vietnam", sans-serif;
}
.my-text-style >>> .v-text-field__slot input {
  background: white;
}
.box {
  display: flex;
  align-items: space-between;
  height: calc(100% - 20vh);
}
.circle {
  margin: 38px 80px 50px 50px;
  height: 500px;
  width: 480px;
  background: linear-gradient(rgb(244, 215, 247), rgb(194, 223, 240));
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
img {
  margin: 60px 50px 50px 62px;
  height: 500px;
  display: flex;
}

.formLogin {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

h2 {
  margin-bottom: 7px;
  font-size: 38pt;
}

label {
  margin-top: 2px;
  margin-bottom: 1px;
}

.v-text-field {
  width: 280px;
}
</style>
