<template>
  <div class="main d-flex flex-column mb-5">
    <div class="content-title">
      <h1 class="mt-3">Dogs</h1>
      <hr style="width: 80%;" />
      <div class="row d-flex justify-content-around p-5">
        <Card v-for="dog in dogs" :key="dog._id" :dog="dog" @deleteDog="fetchDog()"></Card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Card from "../components/Card";
const url = `http://localhost:3000`;
export default {
  data() {
    return {
      dogs: []
    };
  },
  methods: {
    fetchDog() {
      Swal.showLoading();
      const token = localStorage.getItem("token");
      axios({
        url: `${url}/pets`,
        method: "get",
        headers: {
          token
        }
      })
        .then(({ data }) => {
          this.dogs = data;
          Swal.close();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {
    Card
  },
  created() {
    this.fetchDog();
  }
};
</script>

<style scoped>
</style>