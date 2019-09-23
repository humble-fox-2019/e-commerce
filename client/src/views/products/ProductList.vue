<template>
  <div class="productList">
    <h2 class="subheading grey--text">-</h2>
    <v-row>
      <v-col v-for="product in products" :key="product._id" cols="12" sm="2" xm="12">
        <v-card
          class="mx-auto"
          :flat="flat"
          :loading="loading"
          :outlined="outlined"
          :elevation="elevation"
          :raised="raised"
          :width="width"
          :height="height"
        >
          <router-link :to="`/product/${product._id}`">
            <v-img v-if="media" class="white--text" height="300px" :src="product.image"></v-img>
          </router-link>

          <v-card-text>{{product.name}}</v-card-text>
          <v-card-actions v-if="actions">
            <v-btn icon :to="`/xx/${product._id}`">
              <v-icon class="red--text">mdi-heart</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn outlined v-if="token" @click="addToCart(product._id)">Buy</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar
      v-model="snackBar"
      :color="snackColor"
      multi-line="multi-line"
      right="right"
      top="top"
      style="white-space: pre-line;"
    >
      {{ snackMsg }}
      <v-btn dark text @click="snackBar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import db from "@/apis/axios";

export default {
  name: "productList",

  data: () => ({
    flat: false,
    media: true,
    loading: false,
    actions: true,
    outlined: false,
    elevation: undefined,
    raised: false,
    width: 344,
    height: undefined,
    products: [],
    token: "",
    snackMsg: "",
    snackColor: "error",
    snackBar: false
  }),
  methods: {
    getProducts() {
      db.get("/products")
        .then(response => {
          response.data.forEach(el => {
            let { _id, name, price, description, category, stock, image } = el;

            this.products.push({
              _id,
              name,
              price,
              description,
              category,
              stock,
              image
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    addToCart(productid) {
      db.post(
        "/cart",
        { productid, qty: 1 },
        {
          headers: {
            access_token: this.$store.state.token
          }
        }
      )
        .then(({ data }) => {
          this.snackMsg = "Add book to cart success";
          this.snackColor = "success";
          this.snackBar = true;
        })
        .catch(err => {
          if(err.response.data) {
            this.snackMsg = err.response.data.message.join("\n");
            this.snackColor = "error";
            this.snackBar = true;
          } else {
            console.log(err);
          }
        })
        .finally(() => {});
    }
  },
  created() {
    this.getProducts();
    this.token = this.$store.state.token;
  }
};
</script>

<style>
.v-input__slider {
  width: 100%;
}
</style>