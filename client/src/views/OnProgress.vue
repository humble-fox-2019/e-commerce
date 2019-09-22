<template>
  <div class="w-full">
    <div class="mt-10 mx-64">
      <h1 class="text-4xl font-bold mb-4 border-b-2 border-black">Checkout</h1>
      <div class="flex mb-2 mt-2">
        <div class="w-1/2 text-2xl font-bold text-center">
          Order Id
        </div>
        <div class="w-1/2 text-2xl font-bold text-center">
          Action
        </div>
      </div>
      <OnProgressCard v-for="cart in onProgressState" :key="cart._id" :cart="cart"></OnProgressCard>
    </div>
  </div>
</template>

<script>
import OnProgressCard from '@/components/OnProgressCard'

export default {
  components: {
    OnProgressCard
  },
  created() {
    this.$store.dispatch('fetchOnProgress')
  },
  computed: {
    onProgressState() {
      return this.$store.getters.onProgress
    }
  }
}
</script>

<style></style>
