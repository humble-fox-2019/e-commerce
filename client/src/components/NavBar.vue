<template>
  <div class="w-full flex items-end mt-10" id="nav">
    <UserModal v-if="showUserModal === true"></UserModal>

    <ul class="w-full flex items-center">
      <li class="ml-16">
        <button class="focus:outline-none text-6xl">
          <i class="fas fa-infinity"></i>
        </button>
      </li>
      <li class="w-1/4 ml-24" v-if="isLogin">
        <ul class="flex justify-around text-sm">
          <li>
            <router-link to="/products">Product</router-link>
          </li>
          <li>
            <router-link v-if="!isAdminState" to="/history">History</router-link>
          </li>
        </ul>
      </li>

      <li class="ml-auto flex items-center focus:outline-none" v-if="isLogin">
        <button class="text-4xl mr-10" @click="logout">
          <i class="fas fa-sign-out-alt"></i>
        </button>
        <router-link
          v-if="!isAdminState"
          class="pl-8 pr-24 py-4 bg-black text-white focus:outline-none"
          to="/carts"
        >
          <i class="fas fa-shopping-cart text-2xl"></i>
        </router-link>
        <div>
          <button
            v-if="isAdminState"
            @click="showUserModal = !showUserModal"
            class="h-auto text-2xl py-3 px-6 border-l d border-white bg-black text-white text-2xl focus:outline-none"
          >
            <i class="fas fa-user"></i>
          </button>
        </div>
      </li>

      <li class="ml-auto w-1/4" v-else>
        <div class="flex justify-around">
          <div>
            <router-link to="/login">Login</router-link>
          </div>
          <div>
            <router-link to="/signUp">Register</router-link>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import UserModal from '@/components/UserModal'

export default {
  name: 'navBar',
  components: {
    UserModal
  },
  props: ['isLogin'],
  data() {
    return {
      showUserModal: false
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/')
      })
    }
  },
  computed: {
    isAdminState() {
      return this.$store.getters.isAdmin
    }
  }
}
</script>

<style scoped>
.text-red {
  color: #bf0000;
}
</style>
