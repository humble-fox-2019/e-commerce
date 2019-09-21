<template>
  <div class="productList">
    <h2 class="subheading grey--text">Komik</h2>
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
            <v-btn outlined>Buy</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
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
    products: []
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
    }
  },
  created() {
    this.getProducts();
  }
};
</script>

<style>
.v-input__slider {
  width: 100%;
}
</style>