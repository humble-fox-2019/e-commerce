<template>
  <div id="app">
    <loading :active.sync="isLoadingState" :is-full-page="true"></loading>
    <NavBar :isLogin="isLoginState"></NavBar>
    <router-view />
  </div>
</template>

<script>
import myAxios from '@/configs/myAxios.js'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import NavBar from '@/components/NavBar.vue'

export default {
  name: 'app',
  components: {
    NavBar,
    Loading
  },
  methods: {
    checkToken() {
      const token = this.token
      if (token) {
        myAxios
          .get('/users')
          .then(({ data }) => {
            this.isLoading = false
            this.isLogin = true
            this.token = localStorage.getItem(token)
            this.name = data.name
            if (this.$router.currentRoute.name !== 'products') {
              this.$router.push('/products')
            }
          })
          .catch(console.log)
      } else {
        if (this.$router.currentRoute.path !== '/') this.$router.push('/')
      }
    }
  },
  created() {
    this.$store
      .dispatch('checkToken')
      .then(() => {
        // if (this.$router.currentRoute.path !== '/products') this.$router.push('products')
      })
      .catch(err => {
        // if (this.$router.currentRoute.path !== '/') this.$router.push('/')
      })
  },

  computed: {
    isLoginState() {
      return this.$store.getters.isLogin
    },
    isLoadingState() {
      return this.$store.getters.isLoading
    },
    userState() {
      return this.$store.getters.user
    },
    tokenState() {
      return this.$store.getters.token
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700&display=swap');
@import url('https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700&display=swap');

#app {
  font-family: 'Nunito Sans', sans-serif;
}
</style>
