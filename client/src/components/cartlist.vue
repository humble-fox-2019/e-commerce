<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Product name</th>
          <th scope="col">Product Price</th>
          <th scope="col">amount</th>
          <th scope="col">Subtotal</th>
          <th scope="col">Option</th>
        </tr>
      </thead>
      <tr v-for="(cart,index) in getAllCarts" :key="index">
        <td>{{index+1}}</td>
        <td>{{cart.productId.name}}</td>
        <td>{{cart.productId.price}}</td>
        <td>{{cart.quantity}}</td>
        <td v-text="getSubTotal(cart)"></td>
        <td>
          <button @click="removeCart(cart._id)" class="btn btn-danger">Remove</button>
        </td>
      </tr>
      <tr>
        <th></th>
        <td>Total Price</td>
        <td></td>
        <td></td>
        <td>{{getTotalPriceComputed}}</td>
      </tr>
    </table>
    <div style="display:flex;justify-content:center">
      <button class="btn btn-primary" @click="createTransaction">Checkout</button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "cartList",
  data() {
    return {
      totalPrice: 0,
      allCarts: []
    };
  },
  methods: {
    getSubTotal(cart) {
      let total = Number(cart.quantity * cart.productPrice);
      return `Rp. ${Number(total).toLocaleString("id-IDR")},-`;
    },
    getTotalPrice() {
      return `Rp. ${Number(this.totalPrice).toLocaleString("id-IDR")},-`;
    },
    createTransaction() {
      let total_price = this.totalPrice;
      let CartId = [];
      for (let cart of this.allCarts) {
        CartId.push(cart._id);
      }
      console.log(CartId,"<<<<<<<ini cartId in createtransaction cartlist vue")
      let payload = {
        total_price,
        CartId
      };
      Vue.swal.fire({
        title: "Creating your transactions...",
        allowOutsideClick: () => !Vue.swal.isLoading()
      });
      Vue.swal.showLoading();
      this.$store.dispatch("createTransaction", payload);
    },
    removeCart(id) {
      Vue.swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            this.$store.dispatch("removeCart", id);
          }
        });
    }
  },
  computed: {
    getAllCarts() {
      console.log("jalan nih computed nya");
      console.log(this.$store.state.allCarts);
      return this.$store.state.allCarts;
    },
    getTotalPriceComputed() {
      console.log("ini yang get total price")
      this.allCarts = this.$store.state.allCarts;
      console.log(this.allCarts, "55555555555555");
      let allCarts = this.allCarts;
      this.totalPrice = 0;
      for (let cart of allCarts) {
        let price = cart.quantity * cart.productPrice;
        this.totalPrice += price;
      }
      return `Rp. ${Number(this.totalPrice).toLocaleString("id-IDR")},-`;
    }
  },
  mounted() {

  },
  created() {

  }
};
</script>

<style>
</style>
