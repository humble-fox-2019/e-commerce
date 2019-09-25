<template>
  <div class="main-btn d-flex justify-content-around align-items-center">
    <button class="btn" @click.prevent="gotodog()">
      <i class="fas fa-paw"></i> Dogs
    </button>
    <button class="btn" @click.prevent="gotocart()">
      <i class="fas fa-shopping-cart"></i> Cart
    </button>
    <button class="btn" @click.prevent="gotoorder()">
      <i class="fas fa-clipboard-list"></i> Order
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    gotodog() {
      this.$router.push("/home/dogs");
      // this.$emit('gotodog')
    },
    gotocart() {
      this.$router.push("/home/cart");
      // this.$emit("gotocart");
    },
    gotoorder() {
      this.$router.push("/home/orders");
      // this.$emit("gotoorder");
    }
  }
};
</script>

<style scoped>
.main-btn {
  background-color: whitesmoke;
  /* position: fixed; */
  /* width: 70%; */
  top: 56px;
}
button {
  transition: 0.5s all;
}
button:hover {
  border-bottom: 3px solid black;
  transition: 0.5s all;
}
</style>