<template>
  <div class="flex w-full" id="test">
    <div class="w-1/2">
      <div class="">
        <img
          class="w-full h-screen object-cover"
          src="@/assets/img/malvestida-magazine-u79wy47kvVs-unsplash.jpg"
          alt=""
        />
      </div>
    </div>
    <div class="w-1/2 h-screen flex justify-center items-center text-left text-black">
      <form @submit.prevent="login" class="w-1/2 mx-auto">
        <div class="mb-6">
          <label class="font-bold tracking-tight" for="email">Email</label>
          <br />
          <input
            v-model="email"
            class="w-full px-4 py-3 text-lg rounded focus:outline-none mt-2 border-gray-600 border-2 focus:border-black"
            type="email"
            id="email"
          />
        </div>
        <div class="mb-4">
          <label class="font-bold tracking-tight" for="password">Password</label>
          <br />
          <input
            v-model="password"
            class="w-full px-4 py-3 text-lg rounded focus:outline-none mt-2 border-gray-600 border-2 focus:border-black"
            type="password"
            id="password"
          />
        </div>

        <div v-if="this.errors" class="mb-3">
          <div v-for="error in errors">
            <p class="text-red-600">{{ error }}</p>
          </div>
        </div>

        <button
          class="w-full py-2 bg-black font-bold text-white text-lg rounded border-black border-2 focus:outline-none"
        >
          Login
        </button>
        <div class="text-right text-sm mt-2">
          <button @click="changePage">
            Not a member yet? <span class="font-bold">Sign up for free</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import errorHandler from '@/configs/errorHandler.js'

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      errors: false,
      isLoading: false
    }
  },
  methods: {
    login() {
      const data = {
        email: this.email,
        password: this.password
      }

      this.$store
        .dispatch('login', data)
        .then(() => {
          this.$router.push('products')
        })
        .catch(err => {
          this.errors = err
          console.log(err, 'masuk error')
        })
    },
    changePage() {
      this.$router.push('/signUp')
    }
  }
}
</script>

<style lang="scss"></style>
