<template>
  <div class="card-inside mb-5">
    <div class="preview d-flex flex-column">
      <img :src="image_url" alt="product" style="width: 50%;" />

      <table>
        <tr>
          <td>Name</td>
          <td>: {{name}}</td>
        </tr>
        <tr>
          <td>description</td>
          <td>: {{description}}</td>
        </tr>
        <tr>
          <td>stock</td>
          <td>: {{stock}}</td>
        </tr>

        <button class="btn btn-danger" @click="deleteCard(id)">delete</button>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { isMethod } from "babel-types";
export default {
  props: ["id", "name", "description", "stock", "price", "image_url"],
  data() {
    return {};
  },
  methods: {
    deleteCard(id) {
      axios({
        method: "delete",
        url: `http://localhost:3000/product/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          console.log("masuk datanya disini");
        })
        .catch(err => {
          console.log(id, "<<<< CEK IDNYA ADA ATAU TIDAK UNTUK DI DELETE");
          console.log(err, "<< DISINI LOH ERRORNYA DI DELETE SERVER");
        });
    }
  },
  created() {
    console.log(this.productName, "<<< INI PRODUCT NAMES");
  }
};
</script>

<style>
</style>