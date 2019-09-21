<template>
  <div class="flex" id="test">
    <div class="w-1/2">
      <div class="">
        <img
          class="w-full h-screen object-cover"
          src="@/assets/img/clarisse-meyer-d6pLNFVZt_4-unsplash.jpg"
          alt=""
        />
      </div>
    </div>
    <div class="w-1/2 h-screen flex justify-center items-center text-left text-black">
      <form class="w-1/2 mx-auto">
        <div class="mb-6">
          <label class="font-bold tracking-tight" for="name">Name</label>
          <br />
          <input
            v-model="name"
            class="w-full px-4 py-3 text-lg rounded focus:outline-none mt-2 border-gray-600 border-2 focus:border-black"
            type="text"
            id="name"
          />
        </div>
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
          <div v-for="error in errors" :key="error">
            <p class="text-red-600">{{ error }}</p>
          </div>
        </div>

        <button
          class="w-full py-2 bg-black font-bold text-white text-lg rounded border-black border-2 focus:outline-none"
          @click.prevent="signUp"
        >
          Sign Up
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import errorHandler from '@/assets/config/errorHandler.js'

export default {
  data() {
    return {
      name: 'Buzz',
      email: 'buzz@gmail.com',
      password: '123456',
      errors: false,
      isLoading: false
    }
  },
  methods: {
    signUp() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      this.$store
        .dispatch('register', data)
        .then(() => {
          this.$router.push('products')
        })
        .catch(err => {
          this.errors = err
          console.log(err, 'masuk error')
        })
    }
  }
}
</script>

<style lang="scss"></style>
