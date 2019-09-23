<template>
  <div class="col-12 d-flex justify-content-center p-0 mb-4">
    <b-card no-body class="overflow-hidden cart-card col-12 p-0">
      <b-row no-gutters>
        <b-col sm="4">
          <b-card-img :src="dog.photo" class="rounded-0"></b-card-img>
        </b-col>
        <b-col sm="8">
          <b-card-body
            :title="dog.species"
            class="d-flex flex-column justify-content-between"
            style="height: 100%;"
          >
            <div class="cart-dof-info">
              <b-card-text>
                <p>Price : {{dog.price.toLocaleString('en-ID', {style: 'currency', currency: 'IDR'})}}</p>
              </b-card-text>
            </div>
            <div class="cart-btn d-flex justify-content-around">
              <button @click.prevent="removeCart(dog.id)" class="btn" href="#" variant="primary">
                <i class="fas fa-cart-arrow-down"></i> Remove From Cart
              </button>
            </div>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const url = `http://localhost:3000`;
export default {
  props: ["dog"],
  methods: {
    removeCart(id) {
      const token = localStorage.getItem("token");
      axios({
        url: `${url}/cart/remove/${id}`,
        method: `patch`,
        headers: {
          token
        }
      })
        .then(() => {
          this.$emit('removeCart');
          Swal.fire(`Success`, `Dog has been removed from cart`, `success`);
        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped>
.cart-card {
  transition: 0.5s all;
}
.cart-card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: 0.5s all;
}
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