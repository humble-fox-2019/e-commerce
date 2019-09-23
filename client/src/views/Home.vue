<template>
  <div class="home">
    <navbar></navbar>
    <div>
      <b-jumbotron header="Kohii First" lead="cause kohii and you are the perfect blend" style="background-image: url(https://i.pinimg.com/736x/38/d1/80/38d180d26c3c90cbd406d3e6575adbdb.jpg); height: 300px;">
      </b-jumbotron>
    </div>
    <productsList></productsList>
  </div>
</template>

<script>
// @ is an alias to /src
import navbar from "../components/navbar";
import productsList from "../components/productlist";

export default {
  name: "home",
  components: {
    productsList,
    navbar
  },
  data() {
    return {
      isLogin: false
    };
  }
};
</script>
