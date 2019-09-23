<template>
  <div class="main d-flex flex-column mb-5">
    <div class="content-title">
      <h1 class="mt-3">Cart</h1>
      <div class="d-flex justify-content-around align-items-center">
        <h4 class="m-0">{{value.toLocaleString('en-ID', {style: 'currency', currency: 'IDR'})}}</h4>
        <button @click.prevent="checkout(cart._id)" class="btn">
          <i class="fas fa-dollar-sign"></i> Checkout
        </button>
      </div>
      <hr style="width: 80%;" />
      <div class="d-flex flex-column p-5">
        <CartCard
          v-for="(dog, index) in cart.cartList"
          :key="index"
          :dog="dog"
          @removeCart="getCart()"
        ></CartCard>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const url = `http://localhost:3000`;
import CartCard from "../components/CartCard";
export default {
  data() {
    return {
      cart: [],
      value: 0
    };
  },
  methods: {
    checkout(id) {
      const token = localStorage.getItem("token");
      axios({
        url: `${url}/cart/checkout/${id}`,
        method: "patch",
        headers: {
          token
        }
      })
      .then(({data})=>{
        this.getCart();
        Swal.fire(`Success`, `Checkout complete, Pay the transaction in 24 hours`, `success`);
      })
      .catch(err => {
        console.log(err);
      })
    },
    getCart() {
      const token = localStorage.getItem("token");
      axios({
        url: `${url}/cart`,
        method: "get",
        headers: {
          token
        }
      })
        .then(({ data }) => {
          this.cart = data;
          this.getSum();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getSum() {
      let sum = 0;
      this.cart.cartList.forEach(dog => {
        sum += dog.price;
      });
      this.value = sum;
    }
  },
  components: {
    CartCard
  },
  computed: {},
  created() {
    this.getCart();
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