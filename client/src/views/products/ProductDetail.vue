<template>
  <div class="product">{{id}}</div>
</template>

<script>
export default {
  name: "productDetail",
  data() {
    return {
      id: this.$route.params.id
    };
  }
};
</script>

<style scoped>
</style>