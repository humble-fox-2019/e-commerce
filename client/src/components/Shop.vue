<template>
  <div class="shop">
    <transition name="slide">
      <router-view />
    </transition>
    <h2>ALL COLLECTION</h2>
    <div class="search">
      <router-link to="/shop/cart" style="margin-right:10px">
        <i class="fas fa-shopping-cart"></i>
      </router-link>
      <form>
        <input type="search" placeholder="Search" />
      </form>
    </div>
    <div class="box-product">
      <div class="product" v-for="(product, index) in products" :key="index">
        <router-link to="/shop/id" @click="show = !show">
          <img
            src="https://cdn.shopify.com/s/files/1/0067/1449/0998/products/IMG_7317_400x.jpg?v=1565780269"
            alt="Product"
          />
        </router-link>
        <h4>
          <router-link to="/shop/id" @click="show = !show">WOOD CAMO</router-link>
        </h4>
        <h4>
          <router-link
            to="/shop/id"
            style="color:#6a6a6a; margin-top:5px"
            @click="show = !show"
          >300.000</router-link>
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      products: [1, 2, 1, 1],
      show: false
    };
  }
};
</script>

<style scoped>
@keyframes slide-in {
  0% {
    top: -700px;
  }
  100% {
    top: 78px;
  }
}
.slide-enter-active {
  animation: slide-in 1s;
}
.slide-leave-active {
  animation: slide-in 1s reverse;
}

a {
  text-decoration: none;
}

input {
  width: 180px;
  height: 30px;
  outline: none;
  border: none;
  border-bottom: 1px solid #000;
  background-color: transparent;
  outline-color: transparent;
}
h2 {
  font-size: 20px;
  font-weight: 500px;
  line-height: 33px;
  color: #1c1b1b;
  letter-spacing: 3px;
  padding: 20px 30px;
}

h4 {
  margin-top: 10px;
  font-size: 12px;
}
.shop {
  background-color: #efefef;
}

.search {
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 40px;
}

.box-product {
  display: grid;
  grid-template-columns: auto auto auto;
  padding-left: 50px;
}

.product {
  width: 350px;
  height: 400px;
  margin-top: 20px;
}

img {
  height: 350px;
  width: 100%;
}
</style>