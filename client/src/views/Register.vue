<template>
  <div>
    <h1>Let's Go</h1>
    <form action @submit.prevent="login">
      <div>
         <div>
          <label for="emaillog">Name</label>
        </div>
        <input type="name" id="nameLogin" placeholder="Name" v-model="name" />
      </div>
      <div>
        <div>
          <label for="emaillog">Email</label>
        </div>
        <input type="email" id="emailLogin" placeholder="Email" v-model="email" />
      </div>
      <div>
        <div>
          <label for="passwordlog">Password</label>
        </div>
        <input type="password" id="passwordLogin" v-model="password" />
      </div>
      <div class="subss">
        <button>Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      let email = this.email;
      let password = this.password;
      let name = this.name
      axios({
        url: "http://localhost:3000/register",
        method: "POST",
        data: {
          name,
          email,
          password
        }
      })
      .then(data => {
        Swal.fire({
          position: "center",
          type: "success",
          title: "Register Success",
          showConfirmButton: false,
          timer: 1500
        })
        localStorage.setItem("token", data.data.token);
        //this.$emit("pageIn");
      }).catch(err => {
        console.log(err);
      });
    }
  }
};
</script>

<style scoped>
</style>