<template>
  <div>
    <v-card>
      <v-card-title>Products list</v-card-title>

      <v-btn class="ml-4" color="primary" to="/productAdd">Add a new product</v-btn>

      <v-card-text>
        <v-data-table :headers="headers" :items="products" :items-per-page="5" class="elevation-1">
          <template v-slot:item.action="{ item }">
            <router-link :to="`/product/${item._id}/edit`" dark><v-icon  color="info">mdi-table-edit</v-icon></router-link>
            <v-btn color="pink" text icon @click="deleteProduct(item._id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import db from "@/apis/axios";
import Swal from "sweetalert2";

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
      products: []
    };
  },
  methods: {
    getProducts() {
      db.get("/products", {
        headers: {
          access_token: this.$store.state.token
        }
      })
        .then(({ data }) => {
          let tmpProduct = [];

          data.forEach(el => {
            let { _id, name, author, price, category, stock } = el;
            tmpProduct.push({
              _id,
              name,
              author,
              price,
              category,
              stock,
              action: "edit"
            });
          });

          this.products = tmpProduct;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});
    },
    deleteProduct(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          db.delete("/products/" + id, {
            headers: {
              access_token: this.$store.state.token
            }
          })
            .then(({ data }) => {
              this.getProducts();

              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            })
            .catch(err => {
              if (err.response.data) {
                Swal.fire({
                  type: "error",
                  title: "Oops...",
                  text: err.response.data.message.join("\n")
                });
              } else {
                console.log(err);
              }
            })
            .finally(() => {});
        }
      });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>

<style>
</style>