<template>
  <div>
    <div class>
      <h2>Cart Checkout</h2>
    </div>
  </div>
</template>

<script>
import CartCard from "../components/CartCard";
import Swal from "sweetalert2";
import axios from "../API/url";
export default {
  components: {
    CartCard
  },
  methods: {
    getCart() {
      axios({
        method: "get",
        url: `/getOne`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.cartId = data._id;
          let products = data.products;
          let product = {};
          for (let i = 0; i < products.length; i++) {
            if (product[products[i]._id] == undefined) {
              product[products[i]._id] = {
                id: products[i]._id,
                name: products[i].name,
                description: products[i].description,
                price: 0,
                quantity: products[i].quantity,
                img: products[i].img,
                amount: 0
              };
            }
            product[products[i]._id].amount++;
            product[products[i]._id].price += products[i].price;
          }
          let keys = Object.keys(product);
          let compiled = [];
          for (let i = 0; i < keys.length; i++) {
            compiled.push(product[keys[i]]);
          }
          this.carts = compiled;
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkout() {
      axios({
        method: "put",
        url: `/carts/checkout/${this.cartId}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          products: this.carts
        }
      })
        .then(({ data }) => {
          Swal.fire("Success!", "Transaction Incoming.", "success");
          this.$router.push("/Dashboard");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>