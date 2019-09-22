<template>
  <div class="container">
    <h2 class="text-center mt-4 mb-4">Transaction History</h2>

    <v-tabs background-color="#757575" fixed-tabs dark icons-and-text>
      <v-tabs-slider></v-tabs-slider>

      <v-tab @click="status='pending'" href="#tab-1">
        Pending
        <i class="material-icons">confirmation_number</i>
      </v-tab>

      <v-tab @click="status='delivered'" href="#tab-2">
        Delivered
        <i class="material-icons">directions_bike</i>
      </v-tab>

      <v-tab @click="status='received'" href="#tab-3">
        Received
        <i class="material-icons">home</i>
      </v-tab>
    </v-tabs>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Product</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
          <th scope="col">Total Price</th>
          <th scope="col">Date</th>
          <th scope="col">status</th>
          <th v-if="status==='delivered'" scope="col">options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(transaction,index) in userTransactions" :key="index">
          <th scope="row">{{index+1}}</th>
          <td>
            <li v-for="(cart,index) in transaction.CartId" :key="index">{{cart.ProductId.name}}</li>
          </td>
          <td>
            <li v-for="(cart,index) in transaction.CartId" :key="index">{{cart.amount}}</li>
          </td>
          <td>
            <li
              v-for="(cart,index) in transaction.CartId"
              :key="index"
            >{{changeToDollar(cart.ProductId.price)}}</li>
          </td>
          <td>{{changeToDollar(transaction.totalPrice)}}</td>
          <td>{{convertDate(transaction.createdAt)}}</td>
          <td>{{transaction.status}}</td>
          <td v-if="status==='delivered'">
            <v-btn
              color="#E0E0E0"
              @click="updateTransaction('received', transaction._id)"
            >received</v-btn>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import convertToDollar from "../helpers/convertDollar";

export default {
  name: "transactionHistoryPage",
  data() {
    return {
      status: "pending"
    };
  },
  methods: {
    changeToDollar(Number) {
      return convertToDollar(Number);
    },
    convertDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    },
    updateTransaction(status, id) {
      console.log(status);
      console.log(id);
      let payload = {
        data: { status },
        id
      };
      this.$store.dispatch("updateTransaction", payload);
    }
  },
  computed: {
    userTransactions() {
      return this.$store.state.userTransactions.filter(el => {
        return el.status == this.status;
      });
    }
  },
  mounted() {
    this.$store.dispatch("getAllUserTransactions");
  }
};
</script>

<style>
</style>
