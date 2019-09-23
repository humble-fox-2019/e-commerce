<template>
  <div style="padding-top : 100px;" >
    <div class="row">
    <div class="card col-xl-3 col-lg-3 col-md-6 col-sm-12 m-5"  style="width: 18rem;" v-for="product in productList" :key="product._id" >
      <div class="card-body">
        <img :src="product.Product.image" alt="" class="gambar-detail">
        <h5 class="card-title">{{product.Product.name}}</h5>  
        <h6 class="card-subtitle mb-2 text-muted">Quantity : {{product.quantity}}</h6>
        <h6 class="card-subtitle mb-2 text-muted">Total : Rp. {{product.quantity * product.Product.price}}</h6>
      </div>
    </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    props : ["data"],
  created() {
      console.log(this.$route.params.id , ' pplplplplpl')
      this.fetchData()
  },
  data (){
      return {
          productList : []
      }
  },
  methods : {
    fetchData (){
      axios({
      url: `http://34.87.84.241/transaction/${this.$route.params.id}/detail`,
      method: "GET",
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(data => {
        this.productList = data.data.ProductList;
        console.log(data  , ' =-----------------------------0===============')
        console.log(data.data.ProductList, " masa null sih");
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
 watch: {
    "$route.params.id": function () {
      this.fetchData()
    }
  },
};
</script>

<style scoped>
  .detail-cart-mine {
    background-color: rgb(211, 153, 44);
    width: 100%;

  }
  .content-image {
    height: 100%;
    margin-right: 8px;
    margin-top: 100px;
    
  }
  .content-image img {
    width: 20%;
    height: 100%;
  }
  .gambar-detail {
    height: 20%;
    width: 40%;
  }
</style>