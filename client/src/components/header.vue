<template>
  <div class="navbarout" id="navbarTokenFalse">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img src="../assets/LogoMakr_4DLPBp.png" class="logo-pic-nav" alt srcset />
      </a>

      <div class="btn-group ml-auto">
        <form action class="mr-5 formbar">
          <input type="text" placeholder="search" name="search" class="searchbar" id="search" />
          <button
            type="submit"
            id="submitsearch"
            class="searchButton"
            style="border-radius: 10%"
          >Submit</button>
        </form>
        <!-- <a href="#" onclick="signOut();" class="btn btn-outline-warning ml-2 rounded-lg">Sign out</a> -->
        <a href="#" id="logOut" class="btn btn-danger" @click.prevent="signOut">Sign out</a>
        <b-button variant="success" class="chart ml-2">Chart</b-button>
        <!-- BAGIAN MODALS CREATE -->
        <div>
          <b-button id="show-btn" @click="showModal" class="btn btn-primary ml-3">add product</b-button>

          <b-modal ref="my-modal" hide-footer title="Using Component Methods">
            <div class="d-block text-center">
              <!-- ADD PRODUCT -->
              <form action>
                <!-- UNTUK NAME -->
                <div class="form-group mt-5 mb-5 d-flex flex-column text-center">
                  <label for="inputProductName">Product Name</label>
                  <input
                    class="text-center"
                    type="text"
                    placeholder="enter product name"
                    v-model="newProduct.productName"
                    style="background-color:#FEFEDF"
                    required
                  />
                </div>
                <!-- UNTUK DESCRIPTION -->
                <div class="form-group d-flex flex-column text-center">
                  <label for="inputDescription">Description</label>
                  <input
                    class="text-center"
                    type="text"
                    placeholder="enter description"
                    v-model="newProduct.description"
                    style="background-color:#FEFEDF"
                    required
                  />
                </div>
                <div class="form-group d-flex flex-column text-center">
                  <label for="inputStock">stock</label>
                  <input
                    class="text-center"
                    type="number"
                    placeholder="enter number of stock"
                    v-model="newProduct.stock"
                    style="background-color:#FEFEDF"
                    required
                  />
                </div>
                <div class="form-group d-flex flex-column text-center">
                  <label for="inputPrice">price</label>
                  <input
                    class="text-center"
                    type="number"
                    placeholder="enter assign to who"
                    v-model="newProduct.price"
                    style="background-color:#FEFEDF"
                    required
                  />
                  <small
                    id="title-small"
                    class="form-text text-muted"
                  >Place input to whom you want this task to.</small>
                </div>
                <!-- input image -->
                <input type="file" @change="handleInputFile" />
              </form>
            </div>
            <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
            <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Post Product</b-button>
          </b-modal>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      newProduct: {
        productName: "",
        description: "",
        stock: 0,
        price: 0
      },
      image_url: ""
    };
  },
  methods: {
    handleInputFile(e) {
      this.image_url = e.target.files[0];
    },
    signOut() {
      console.log("masuk ke bagian clear");
      localStorage.clear();
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    postItem() {
      const formData = new FormData();
      formData.append("productName", this.newProduct.productName);
      formData.append("description", this.newProduct.description);
      formData.append("stock", this.newProduct.stock);
      formData.append("price", this.newProduct.price);
      formData.append("file", this.image_url);

      console.log(formData, "<<<< FORM DATANYA");
      // console.log(this.)
      axios({
        method: "POST",
        url: `http://localhost:3000/product`,
        data: formData,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          console.log(
            this.image_url,
            "<<<< INI GAMBARNYA MASUK GAAA GA MASUK WOOI"
          );
          console.log(
            data,
            "<<<<< BERHASIL JALAN DARI CLIENT KE SERVER UNTUK POST"
          );
          // this.fetchdata();
        })
        .catch(err => {
          console.log(err, "<<<<<<< OOPS ADA YANG ERROR DI POST DATANYA");
        });
    },

    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["my-modal"].toggle("#toggle-btn");
      this.postItem();
    }
  }
};
</script>   

<style>
.logo-pic-nav {
  height: 60px;
}
</style>