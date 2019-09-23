<template>
  <div>
    <h1>Let's Go</h1>
    <form action @submit.prevent="login">
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
        <button>SignIn</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      let email = this.email;
      let password = this.password;
      axios({
        url: "http://localhost:3000/login",
        method: "POST",
        data: {
          email,
          password
        }
      })
      .then(data => {
          console.log(data);
        Swal.fire({
          position: "center",
          type: "success",
          title: "Successfully login",
          showConfirmButton: false,
          timer: 1500
        })
        localStorage.setItem("token", data.data.token);
        //this.$emit("pageIn");
        this.$router.push('Dashboard') 
      }).catch(err => {
        console.log(err);
      });
    }
  }
};
</script>

<style scoped>
.login{
    display:flex;
    justify-content: center;
}
</style>