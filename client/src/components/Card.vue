<template>
  <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 p-1 d-flex justify-content-center mb-4">
    <b-card
      :title="dog.species"
      :img-src="dog.photo"
      img-alt="Image"
      img-width="300"
      img-top
      tag="article"
      style="max-width: 15rem;"
      class="mb-2 dog-card"
    >
      <b-card-text>
        <p>Price : {{dog.price.toLocaleString('en-ID', {style: 'currency', currency: 'IDR'})}}</p>
        <p>Stock : {{dog.stock}}</p>
      </b-card-text>
      <b-button class="del-btn" @click.prevent="addCart(dog._id)" href="#" variant="primary">
        <i class="fas fa-cart-plus"></i> Add to Cart
      </b-button>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const url = `http://34.87.3.189`;
export default {
  props: ["dog"],
  methods: {
    addCart(id) {
      const token = localStorage.getItem("token");
      axios({
        url: `${url}/cart/add/${id}`,
        method: "patch",
        headers: {
          token
        }
      })
        .then(({ data }) => {
          Swal.fire(
            `Success`,
            `This Dog has been added to your cart`,
            `success`
          );
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.dog-card {
  transition: 0.5s all;
}
.dog-card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: 0.5s all;
}
.del-btn:hover {
  color: whitesmoke;
  transition: 0.7s all;
}
.del-btn {
  color: grey;
  transition: 0.7s all;
}
</style>