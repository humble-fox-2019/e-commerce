<template>
  <div class="home">
    <carousel class="container mt-4"></carousel>
    <productsList :allProducts="allProducts"></productsList>
  </div>
</template>

<script>
// @ is an alias to /src
import navbar from "../components/navbar";
import { mapState } from "vuex";
import productsList from "../components/productList";
import carousel from "../components/carousel";
export default {
  name: "home",
  components: {
    productsList,
    navbar,
    carousel
  },
  data() {
    return {
      isLogin: false
    };
  },
  computed: {
    ...mapState(["textSearch"]),
    allProducts() {
      let name = new RegExp(this.textSearch, "i");

      return this.$store.state.allProducts.filter(el => {
        return name.test(el.name);
      });
    }
  },
  created() {
    this.$store.dispatch("getAllProducts");
  }
};
</script>
