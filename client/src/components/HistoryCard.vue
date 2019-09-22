<template>
  <div>
    <div class="flex">
      <div class="w-1/2 text-center">
        {{ cart._id }}
      </div>
      <div class="w-1/2 text-center">
        {{ cart.updatedAt.split('T')[0] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['cart']
}
</script>

<style></style>
