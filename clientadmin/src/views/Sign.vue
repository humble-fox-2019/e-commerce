<template>
  <div class="container d-flex flex-column justify-content-start align-items-center mt-5">
    <div class="logo d-flex justify-content-center align-items-center shadow">
      <img src="../assets/logo.png" alt="Dirty Paws Logo" />
    </div>
    <H1 class="mt-4">welcome dirty paws admin page</H1>
    <form @submit.prevent="login()">
      <h5>Please Sign In</h5>
      <label>Email</label>
      <input
        v-model="email"
        type="email"
        class="form-control"
        autocomplete="off"
        placeholder="Input email"
      />
      <label class="mt-2">Password</label>
      <input
        v-model="password"
        type="password"
        class="form-control"
        autocomplete="off"
        placeholder="Input password"
      />
      <button class="btn mt-3" type="submit">Sign In</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const url = `http://34.87.3.189`;
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      axios({
        url: `${url}/users/admin`,
        method: "post",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          this.$emit("login");
          this.$router.push('/dogs');
          Swal.fire(`Success`, `Success login`, `success`);
        })
        .catch(err => {
          Swal.fire(`Error`, `Wrong email or password`, `error`);
        });
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$router.push("/home");
    } else {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.logo {
  /* border: 10px solid grey; */
  border-radius: 50%;
  height: 200px;
  width: 200px;
}
button {
  transition: 0.5s all;
  background-color: black;
}
button :hover {
  transition: 0.5s all;
  color: whitesmoke;
}
</style>