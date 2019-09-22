<template>
  <div class="fixed bg-black text-white position">
    <ul>
      <li
        v-if="isAdminState"
        v-for="item in listAdmin"
        :key="item.id"
        class="pl-2 pr-4 py-1 font-semibold border border-white"
      >
        <router-link :to="item.to">
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
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
      ],
      listAdmin: [
        {
          id: 1,
          name: 'Add Product',
          to: '/add-product'
        },
        {
          id: 2,
          name: 'On Progress',
          to: '/on-progress'
        }
      ]
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
