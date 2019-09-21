<template>
  <div class="fixed bg-black text-white position">
    <ul>
      <li
        v-for="list in lists"
        :key="list.id"
        class="pl-2 pr-4 py-1 font-semibold border border-white"
      >
        <router-link :to="list.to">
          {{ list.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: [
        {
          id: 1,
          name: 'Your Profile',
          to: 'users'
        },
        {
          id: 2,
          name: 'Add Product',
          to: 'add-product'
        },
        {
          id: 3,
          name: 'Your Products',
          to: 'your-product'
        },
        {
          id: 4,
          name: 'Transactions',
          to: 'transactions'
        }
      ]
    }
  }
}
</script>

<style scoped>
.position {
  top: 8rem;
  right: 0;
}

.slide-enter-active {
  transition: fadeInRight 0.3s ease;
}
.slide-leave-active {
  transition: all 0.2s ease;
}
</style>
