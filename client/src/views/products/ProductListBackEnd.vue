<template>
  <div>
    <v-card>
      <v-card-title>Products list</v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="products" :items-per-page="5" class="elevation-1">
          <template v-slot:item.action="{ item }">
            <router-link :to="`/product/${item.id}/edit`" dark>{{ item.action }}</router-link>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import db from '@/apis/axios';

export default {
  name: "productListBackEnd",
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Author", value: "author" },
        { text: "Price", value: "price" },
        { text: "Category", value: "category" },
        { text: "Stock", value: "stock" },
        { text: "Action", value: "action" }
      ],
      products: [
        {
          id: "1",
          name: "Frozen Yogurt",
          author: 159,
          price: 6.0,
          category: 24,
          stock: 4.0,
          action: "edit"
        }
      ]
    };
  },
  methods: {
    getProducts() {
      console.log(this.$store.state.token);
      db
        .get(
              "/products",
              {
                headers: {
                  access_token: this.$store.state.token
                }
              }
            )
              .then(({ data }) => {
                let tmpProduct = [];
                
                data.forEach(el => {
                  let {id,name,author,price,category,stock} = el
                  tmpProduct.push({id,name,author,price,category,stock, action:"edit"})
                });
                
                this.products = tmpProduct;
              })
              .catch(err => {
                  console.log(err);
              })
              .finally(() => {});
    }
  },
  created() {
    this.getProducts();
  }
};
</script>

<style>
</style>