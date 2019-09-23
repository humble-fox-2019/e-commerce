<template>
  <div>
    <navbar></navbar>
    <center>
      <div class="container mt-5">
        <div class="row px-5">
          <div class="col-4">
            <img :src="choosenProduct.data.image" class="img-fluid" />
          </div>
          <div class="col-6 name">
            <div style="display:flex; justify-content: flex-start">
              <a style="text-align: start">
                <router-link to="/">
                  <strong>Back</strong>
                </router-link>
              </a>
            </div>
            <h1>{{choosenProduct.data.name}}</h1>
            <br />
            <strong><h2 style="text-align: start">About this product:</h2></strong>
            <p class="text-justify" style="text-align: start">{{choosenProduct.data.description}}</p>
            <p style="text-align: start">price : {{changeFormat(choosenProduct.data.price)}}</p>
            <b-form inline class="mt-5" style="display:flex;justify-content:center">
              <b-input
                v-model="quantity"
                class="mr-3"
                type="number"
                value="1"
                min="1"
                :max="choosenProduct.data.stock"
                style="width:4rem;"
              ></b-input>

              <button
                v-if="choosenProduct.data.stock>0"
                class="btn btn-success"
                @click.prevent="addToCart"
              >Add To Cart</button>
              <button
                v-if="choosenProduct.data.stock<=0"
                class="btn btn-secondary"
                disabled="disabled"
              >Out Of Stock</button>
            </b-form>
          </div>
        </div>
      </div>
    </center>
  </div>
</template>

<script>
import navbar from "../components/navbar";
import product from "../components/productcard";
import Vue from "vue";

export default {
  name: "productdetail",
  components: {
    navbar,
    product
  },
  data() {
    return {
      quantity: 0,
      productID: ""
    };
  },
  methods: {
    addToCart() {
      let product = this.$store.state.productDetails.data;
      let loginStatus = this.$store.state.isLogin;
      let cart = {
        quantity: this.quantity,
        id: product._id,
        name: product.name,
        price: product.price
      };
      if (loginStatus) {
        Vue.swal.fire({
          title: "Adding To Your Cart",
          allowOutsideClick: () => !Vue.swal.isLoading()
        });
        Vue.swal.showLoading();
        this.$store.dispatch("addToCart", cart);
      } else {
        Vue.swal.fire({
          type: "error",
          title: "You have to log in to do this",
          showConfirmButton: false,
          timer: 2000
        });
      }
    },
    changeFormat(price) {
      return `Rp. ${Number(price).toLocaleString("id-IDR")},-`;
    }
  },
  computed: {
    choosenProduct() {
      this.productID = this.$store.state.productDetails._id;
      return this.$store.state.productDetails;
    }
  },
  mounted() {
    let id = this.$route.params.id;
    this.$store.dispatch("getOneProduct", id);
  }
};
</script>

<style scoped>
.name h1 {
  font-weight: 600;
  text-align: start;
  font-size: 2em;
}
</style>