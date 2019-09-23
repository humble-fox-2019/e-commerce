<template>
  <div class="d-flex justify-content-around align-items-center mb-3 pr-5">
    <div>
      <h6 class="m-0">{{list._id}}</h6>
    </div>
    <div>
      <h6 class="m-0" v-if="status==='not-payed'">Waiting for Payment</h6>
      <h6 class="m-0" v-if="status==='not-verified'">Waiting verification</h6>
      <h6 class="m-0" v-if="status==='on-delivery'">Delivery on process</h6>
      <h6 class="m-0" v-if="status==='recieved'">Puppy safely arrive</h6>
    </div>
    <div>
      <button class="btn" v-if="status==='not-payed'" @click.prevent="pay(list._id)">
        <i class="fas fa-dollar-sign"></i> Pay
      </button>
      <button class="btn" v-if="status==='not-verified'">Waiting</button>
      <button class="btn" v-if="status==='on-delivery'" @click.prevent="recieve(list._id)">
        <i class="fas fa-box"></i> Recieved
      </button>
      <button class="btn" v-if="status==='recieved'">Recieved</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const url = `http://localhost:3000`;
export default {
  data() {
    return {
      status: "not-payed"
    };
  },
  props: ["list"],
  methods: {
    pay(id) {
      const token = localStorage.getItem("token");
      axios({
        url: `${url}/transactions/pay/${id}`,
        method: "patch",
        headers: {
          token
        }
      })
        .then(({ data }) => {
          this.status='not-verified'
          Swal.fire(
            `Success`,
            `Thank you for complete your payment, please wait for our verification`,
            `success`
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    recieve(id) {
      const token = localStorage.getItem("token");
      axios({
        url: `${url}/transactions/recieved/${id}`,
        method: "patch",
        headers: {
          token
        }
      })
        .then(({ data }) => {
          this.status=`recieved`
          Swal.fire(
            `Success`,
            `Thank you for your patience, enjoy your new endless happiness`,
            `success`
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkStatus() {
      if (
        this.list.payment === false &&
        this.list.delivery === false &&
        this.list.recieved === false
      ) {
        this.status = "not-payed";
      } else if (
        this.list.payment === true &&
        this.list.delivery === false &&
        this.list.recieved === false
      ) {
        this.status = "not-verified";
      } else if (
        this.list.payment === true &&
        this.list.delivery === true &&
        this.list.recieved === false
      ) {
        this.status = "on-delivery";
      } else if (
        this.list.payment === true &&
        this.list.delivery === true &&
        this.list.recieved === true
      ) {
        this.status = "recieved";
      }
    }
  },
  created() {
    this.checkStatus();
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