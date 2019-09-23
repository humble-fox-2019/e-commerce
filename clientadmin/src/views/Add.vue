<template>
  <div>
    <h1>Add New Dog</h1>
    <hr style="border:1px solid;width: 80%" />
    <div class="container d-flex justify-content-center">
      <form @submit.prevent="addNew()" style="width: 50%">
        <label>Species</label>
        <input
          type="text"
          autocomplete="off"
          placeholder="Input species"
          class="form-control"
          v-model="species"
        />
        <label class="mt-2">Price</label>
        <input
          type="number"
          autocomplete="off"
          placeholder="Input price"
          class="form-control"
          v-model="price"
        />
        <label class="mt-2">Stock</label>
        <input
          type="number"
          autocomplete="off"
          placeholder="Input stock"
          class="form-control"
          v-model="stock"
        />
        <label class="mt-2">Picture</label>
        <input
          type="file"
          v-on:change="handlefileupload($event)"
          lang="es"
          accept=".jpg"
          class="form-control"
        />
        <img
          v-if="file"
          :src="file"
          alt
          class="mt-2"
          style="width: 200px; height: 200px; object-fit: cover; border-radius: 10px;"
        />
        <div>
          <button class="btn mt-3">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const url = `http://34.87.3.189`;
export default {
  data() {
    return {
      species: "",
      stock: "",
      price: "",
      file: ""
    };
  },
  methods: {
    handlefileupload(event) {
      let file = event.target.files || event.dataTransfer.files;
      if (file.length) {
        console.log(file[0]);
        this.file = file[0];
      }
    },
    addNew() {
      Swal.showLoading();
      const token = localStorage.getItem("token");
      let formData = new FormData();
      formData.set("species", this.species);
      formData.set("stock", this.stock);
      formData.set("file", this.file);
      formData.set("price", this.price);
      axios({
        url: `${url}/pets/`,
        method: "post",
        data: formData,
        headers: {
          token
        }
      })
        .then(({ data }) => {
          Swal.close();
          this.species = "";
          this.stock = "";
          this.file = "";
          this.price = "";
          Swal.fire(`Success`, `Success add new dog to store`, `success`);
        })
        .catch(err => {
          console.log(err);
          Swal.fire(`Error`, `Invalid input format`, `error`);
        });
    }
  }
};
</script>

<style scoped>
button {
  transition: 0.5s all;
  background: black;
}
button:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  color: whitesmoke;
  transition: 0.5s all;
}
</style>