<template>
  <div class="mainpage">
    <mainHeader></mainHeader>
    <div class="main d-flex">
      <contents class="col-10" :products="products"></contents>
    </div>

    <div class="main"></div>
  </div>
</template>

<script>
import mainHeader from "../components/header";
import axios from "axios";
import contents from "../components/content";
const baseUrl = "localhost:3000/product";
export default {
  data() {
    return {
      products: []
    };
  },
  components: {
    mainHeader,
    contents
  },
  methods: {
    getall() {
      console.log("masuk get all");
      axios({
        method: "get",
        url: "http://localhost:3000/product",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.products = data.data;
          // console.log(data.data[0].image_url, ",<<<< ini datanya masuk ");
        })
        .catch(err => {
          console.log(err, "<<< INI ERRORNYA");
        });
    }
  },
  created() {
    this.getall();
    // console.log(this.data);
    // console.log(this.products, "<<<< MASUK PRODUCTSNYA ");
  }
};
</script>

<style>
.mainpage {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid black;
}

.main {
  flex-direction: row;
  border: 2px solid red;
}

/* .leftsection {
  border: 2px solid blue;
}

.mainsection {
  border: 2px solid burlywood;
} */
</style>