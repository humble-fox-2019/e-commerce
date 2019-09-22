<template>
  <v-card>
    <v-card-title>Add a new product</v-card-title>

    <v-card-text>
      <v-form>
        <v-text-field v-model="name" label="Name"></v-text-field>

        <v-text-field v-model="author" label="Author"></v-text-field>

        <v-text-field v-model="price" label="Price"></v-text-field>

        <v-text-field v-model="description" label="Description"></v-text-field>

        <v-text-field v-model="stock" label="Stock"></v-text-field>

        <v-text-field v-model="category" label="Category"></v-text-field>

        <input type="file" placeholder="action" v-on:change="handlefileupload($event)">
        
        <br>
        <br>
        
        <v-btn color="success" class="mr-4" @click="save()">Save</v-btn>
      </v-form>
    </v-card-text>
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
  </v-card>
</template>

<script>
import db from "@/apis/axios";

export default {
    name: "productAdd",
  data() {
    return {
      name: "",
      author: "",
      price: "",
      description: "",
      stock: "",
      category: "",
      image: "",

      snackMsg: "",
      snackColor: "",
      snackBar: false
    };
  },
  methods: {
    save() {
      let formData = new FormData();
      formData.set("name", this.name);
      formData.set("author", this.author);
      formData.set("price", this.price);
      formData.set("description", this.description);
      formData.set("stock", this.stock);
      formData.set("category", this.category);
      formData.set("image", this.image);

      db.post(
        "/products",
        formData,
        {
          headers: {
            access_token: this.$store.state.token
          }
        }
      )
        .then(({ data }) => {
          this.snackMsg = "Create new product success";
          this.snackColor = "success";
          this.snackBar = true;
          
          setTimeout(() => { 
            this.$router.push('products');
           }, 1000);
        })
        .catch(err => {
          if (err.response.data) {
            this.snackMsg = err.response.data.message.join("\n");
            this.snackColor = "error";
            this.snackBar = true;
          } else {
            console.log(err);
          }
        })
        .finally(() => {});
    },
    handlefileupload(event) {
      let image = event.target.files || event.dataTransfer.files;
      this.image = image[0];
    }
  }
};
</script>

<style>
</style>