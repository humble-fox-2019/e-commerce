<template>
  <div>
    <div class="flex">
      <div class="w-1/2 text-center">
        {{ cart._id }}
      </div>
      <div class="w-1/2 text-center">
        <button v-if="!cart.status" @click="confirmBuy" class="underline focus:outline-none">
          Confirm
        </button>
        <p v-else @click="confirmBuy" class="font-bold">
          Confirmed
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['cart'],
  methods: {
    confirmBuy() {
      this.$store.dispatch('confirmBuy', this.cart._id)
    }
  }
}
</script>

<style></style>
