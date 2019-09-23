<template>
  <div class ="shadow p-0 mb-1 bg-white rounded navbar">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand href="#" >Kohii</b-navbar-brand>
        <b-navbar-nav class="ml-auto mr-3">
          <b-nav-item v-if="!$store.state.isLogin" v-b-modal.modal-login>Login</b-nav-item>
          <b-nav-item v-if="!$store.state.isLogin" @click="registerModal = true">Register</b-nav-item>
          <b-nav-item-dropdown
            v-if="$store.state.isLogin"
            :text="UsernameLogin || 'User'"
            right
          >
           <b-dropdown-item @click="goToProfilePage">History</b-dropdown-item>
            <b-dropdown-item @click="userSignOut">Sign Out</b-dropdown-item>
            <b-dropdown-item @click="goToCartPage">Cart</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-navbar>

    <!-- Modal untuk register ke e-commerce  -->
    <b-modal id="modal-register" v-model="registerModal">
      <b-form @submit.prevent="userRegister" id="registerUserForm">
        <b-form-group label="Enter username: " label-for="username">
          <b-form-input type="text" v-model="registerForm.username" placeholder="username" required></b-form-input>
        </b-form-group>
        <b-form-group label="Enter your e-mail" label-for="person">
          <b-form-input type="text" v-model="registerForm.email" placeholder="email" required></b-form-input>
        </b-form-group>
        <b-form-group label="Enter your password" label-for="password">
          <b-form-input
            type="password"
            v-model="registerForm.password"
            placeholder="password"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>
      <div slot="modal-footer">
        <b-button variant="primary" type="submit" form="registerUserForm">Confirm</b-button>
      </div>
    </b-modal>

    <!-- Modal untuk login ke e-commerce -->
    <b-modal id="modal-login" v-model="loginModal">
      <b-form @submit.prevent="userLogin" id="userLoginForm">
        <b-form-group label="Enter your email" label-for="email">
          <b-form-input type="text" v-model="loginForm.email" placeholder="email" required></b-form-input>
        </b-form-group>
        <b-form-group label="password" label-for="person">
          <b-form-input
            type="password"
            v-model="loginForm.password"
            placeholder="password"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>
      <div slot="modal-footer">
        <b-button variant="primary" data-dismiss="modal" type="submit" form="userLoginForm">Confirm</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import Vue from 'vue'

export default {
  data () {
    return {
      username: '',
      isLogin: false,
      registerModal: false,
      loginModal: false,
      registerForm: {
        username: '',
        email: '',
        password: ''
      },
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    userLogin () {
      this.$store.dispatch('userLogin', this.loginForm)
      this.loginModal = false
      Vue.swal.showLoading()
      this.username = this.$store.state.username
      this.loginForm.email = ''
      this.loginForm.password = ''
    },
    userRegister () {
      this.$store.dispatch('userRegister', this.registerForm)
      this.registerModal = false
      Vue.swal.showLoading()
      this.registerForm.username = ''
      this.registerForm.email = ''
      this.registerForm.password = ''
    },
    userSignOut () {
      Vue.swal.showLoading()
      localStorage.removeItem('token')
      this.$store.commit('status_login', false)
      this.$router.push({ path: '/' })
      Vue.swal.close()
      Vue.swal.fire({
        type: 'success',
        title: 'You Have Logged Out !',
        showConfirmButton: false,
        timer: 2000
      })
    },
    goToCartPage () {
      this.$router.push({ path: '/cart' })
    },
    goToProfilePage () {
      this.$router.push({ path: '/userProfile' })
    }
  },
  computed: {
    loginStatus () {
      let status = this.$store.state.isLogin
      console.log(status)
      if (status) {
        this.$bvModal.hide('modal-login')
      }
    },
    UsernameLogin () {
      return this.$store.state.username
    }

  },
  created: function () {
    this.username = this.$store.state.username
  }
}
</script>

<style scoped>
.navbar{
    width: 100%
}
</style>
