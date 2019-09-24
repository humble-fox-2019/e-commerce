<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on" @click="getOne(productId)">Edit Products</v-btn>
      </template>
      <v-form @submit.prevent="editProduct">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Product</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Product Name" v-model="name" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Products Stock" type="number" v-model="stock" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Price" required v-model="price"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-file-input
                    show-size
                    label="Image input"
                    type="file"
                    ref="file"
                    v-on:change="handlefileupload($event)"
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text type="submit">Edit</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import { mapState } from "vuex";
export default {
  props: ["productId"],
  data: () => ({
    dialog: false,
    name: "",
    price: "",
    stock: 0,
    image: ""
  }),
  methods: {
    handlefileupload() {
      let file = event.target.files || event.dataTransfer.files;
      this.image = file[0];
    },
    editProduct() {
      let id = this.productId;
      let token = localStorage.getItem("tokenAdmin");
      let editData = new FormData();
      editData.set("image", this.image);
      editData.set("price", this.price);
      editData.set("stock", this.stock);
      editData.set("name", this.name);
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false,
        loader: "dots",
        color: "#23374d"
      });
      axios({
        method: "patch",
        url: `http://35.225.201.56/products/${id}`,
        headers: {
          token
        },
        data: editData
      })
        .then(({ data }) => {
          loader.hide()
          this.dialog = false;
          this.$store.dispatch("getProducts");
          this.$toast.success("Product Edited..", "Success");
        })
        .catch(error => {
          loader.hide()
          let message =
            (error.response.data && error.response.data.message) ||
            "Failed to Edit Product";
          this.toast.error(message, "Error");
        });
    },
    getOne(id) {
      axios({
        method: "GET",
        url: `http://35.225.201.56/products/${id}`,
        headers: {
          token: localStorage.getItem("tokenAdmin")
        }
      })
        .then(({ data }) => {
          let product = data.data;
          this.name = product.name;
          this.price = product.price;
          this.stock = product.stock;
          this.image = product.image;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>