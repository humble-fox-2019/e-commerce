<template>
  <div class="signup-form">
    <div class="mb-4">
        <h2>Create an account</h2>
        <div class="or-seperator"></div>
    </div>
    <form @submit.prevent="signup">
        <div class="form-group">
            <input type="text" class="form-control input-lg" name="fullname" id="fullname" placeholder="Full name" required="required" v-model="name">
        </div>
        <div class="form-group">
            <input type="email" class="form-control input-lg" name="email" id="email" placeholder="Email Address" required="required" v-model="email">
        </div>
        <div class="form-group">
            <input type="password" class="form-control input-lg" name="password" id="password" placeholder="Password" required="required" v-model="password">
        </div>
        <div class="form-group">
            <button class="btn btn-lg btn-block signup-btn" id="btnSignUp">Sign Up</button>
        </div>
    </form>
    <div class="text-center">Already have an account? <a id="btnLoginHere" @click="goToLogin">Login here</a></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Signup',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  computed: mapState(['toggleStatus']),
  methods: {
    goToLogin() {
      this.$router.push('/auth/signin')
    },
    signup() {
      let payload = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('signup', payload)
    }
  },
  watch: {
    'toggleStatus.type'() {
      switch (this.toggleStatus.type) {
        case 'signup_success':
          this.$swal.mixin({
            position: 'center',
            showConfirmButton: false,
            timer: 3000
          }).fire({
            type: 'success',
            title: this.toggleStatus.message
          })
          this.$router.push('/auth/signin')
          break;
        case 'signup_failed':
          this.$swal.mixin({
            position: 'center',
            showConfirmButton: false,
            timer: 3000
          }).fire({
            type: 'error',
            title: this.toggleStatus.message
          })
          break;
      }
    }
  }

}
</script>

<style scoped>
.form-control {
    font-size: 14px;
    transition: all 0.4s;
    box-shadow: none;
}
.form-control:focus {
    border-color: #3FB288;
}
.form-control, .btn {
    border-radius: 50px;
    outline: none !important;
}
.signup-form {
    width: 480px;
    margin: 50px auto;
    padding: 30px 0;
    border-radius: 5px;
    margin-bottom: 20px;
    background: #fff;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    padding: 40px;
}
.signup-form a{
    color: #3FB288;
}    
.signup-form h2 {
    text-align: center;
    font-size: 34px;
    margin: 10px 0 15px;
}
.signup-form .hint-text{
    color: #999;
    text-align: center;
    margin-bottom: 20px;
}
.signup-form .form-group{
    margin-bottom: 20px;
}
.signup-form .btn {        
    font-size: 18px;
    line-height: 26px;
    font-weight: bold;
    text-align: center;
    border-radius: 18px;
}
.or-seperator {
    text-align: center;
    border-top: 1px solid #e0e0e0;
}
.or-seperator b {
    padding: 0 10px;
    width: 40px;
    height: 40px;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    background: #fff;
    display: inline-block;
    border: 1px solid #e0e0e0;
    border-radius: 50%;
    position: relative;
    top: -22px;
    z-index: 1;
}

#btnLoginHere, #btnRegisterHere {
    color: #3FB288;
    cursor: pointer;
}
#btnSignUp {
  color: white;
  background-color: #3FB288
}
</style>