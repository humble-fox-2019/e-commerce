<template>
  <div class='box'>
    <div>
      <img src='../assets/37254.jpg' alt srcset />
    </div>

    <div class='circle'>
      <v-form action class='formRegister' @submit.prevent='registMe'>
        <h2>Register</h2>
        <br>
        <label for>Name</label>
            <v-text-field v-model='name' class="my-text-style"></v-text-field>
        <label for>Email</label>
            <v-text-field type='email' v-model='email' class="my-text-style"></v-text-field>
        <label for>Password</label>
          <v-text-field v-model='password' class="my-text-style" type='password' :rules="[rules.required, rules.minPassword]" hint="At least 8 characters"
          ></v-text-field>
        <label for>Address</label>
            <v-text-field v-model='address' class="my-text-style" :rules="[rules.required, rules.minAddress]" hint="At least 12 characters"></v-text-field>
            <br>
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
      message: 'register',
      name: '',
      email: '',
      password: '',
      address: '',
      rules: {
        required: value => !!value || 'Required.',
        minPassword: v => v.length >= 8 || 'Min 8 characters',
        minAddress: v => v.length >= 12 || 'Min 12 characters' }
    }
  },
  methods: {
    registMe () {
      console.log('here')
      axios({
        method: 'post',
        url: baseUrl + '/users/create',
        data: {
          name: this.name,
          email: this.email,
          password: this.password,
          address: this.address
        }
      })
        .then(data => {
          this.$toastr.Add({
            title: 'Success create an account',
            msg: 'Please login..',
            clickClose: false,
            timeout: 2000,
            position: 'toast-top-center',
            type: 'info',
            preventDuplicates: true,
            style: { backgroundColor: '#095d77', width: '525px', height: '100px', 'font-size': '21pt' }
          })
          this.name = ''
          this.email = ''
          this.password = ''
          this.address = ''
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
 .my-text-style >>> .v-text-field__slot input {
    background: white
  }

.box {
  display: flex;
  justify-content: space-between;
  align-items: space-between;
}
.circle {
  margin: 38px 80px 50px 50px;
  height: 615px;
  width: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgb(215, 244, 247), rgb(219, 197, 248));
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
img {
  margin: 90px 50px 50px 100px;
  height: 500px;
  display: flex;
}

.formRegister {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

h2{
  margin-top: -8px;
  margin-bottom: 7px;
  font-size: 36pt;
}

label {
  margin-top: 2px;
  margin-bottom: 1px
}

.v-text-field{
    width: 250px;
}

</style>
