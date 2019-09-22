<template>
  <div class="w-full">
    <div class="mt-10 mx-64">
      <h1 class="text-4xl font-bold mb-4 border-b-2 border-black">History</h1>
      <div class="flex mb-2 mt-2">
        <div class="w-1/2 text-2xl font-bold text-center">
          Order Id
        </div>
        <div class="w-1/2 text-2xl font-bold text-center">
          Confirmed On
        </div>
      </div>
      <HistoryCard v-for="cart in historyState" :key="cart._id" :cart="cart"></HistoryCard>
    </div>
  </div>
</template>

<script>
import HistoryCard from '@/components/HistoryCard'

export default {
  components: {
    HistoryCard
  },
  created() {
    this.$store.dispatch('fetchHistory')
  },
  computed: {
    historyState() {
      return this.$store.getters.history
    }
  }
}
</script>

<style></style>
