<template>
  <div class="register">
    <form @submit="getRegister">
      <h3>Sign Up</h3>
      <div>
        <input type="text" placeholder="Name" v-model="name" />
      </div>
      <div>
        <input type="text" placeholder="Email" v-model="email" />
      </div>

      <div>
        <input type="password" placeholder="Password" v-model="password" />
      </div>
      <input type="submit" value="Sign Up" />
      <p style="font-size: 10px;">
        Already have an TokoCode Account? Sign In
        <a
          href="#"
          style="text-decoration: none; color: #187ECF"
          @click="showLogin"
        >here</a>
      </p>
    </form>
  </div>
</template>

<script>
import Axios from "axios";
import Swal from "sweetalert2";
let baseUrl = "http://localhost:3000";

export default {
  data: function() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    showLogin() {
      this.$emit("loginShow");
    },
    getRegister() {
      let name = this.name;
      let email = this.email;
      let password = this.password;
      Swal.fire({
        title: `Creating Your Account...`,
        allowOutsideClick: () => !Swal.isLoading()
      });
      Swal.showLoading();
      Axios({
        method: `post`,
        url: `${baseUrl}/users/register`,
        data: {
          name,
          email,
          password,
          rule: "customer",
          cart: []
        }
      })
        .then(response => {
          Swal.close();
          Swal.fire("Success!", "Your Account is Created!", "success");
          this.$emit("registerDone");
        })
        .catch(error => {
          let msg = error.response.data.message || "Fail to Register";
          Swal.fire("Error!", msg, "error");
        })
        .finally(() => {
          this.name = "";
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>

<style scoped>
h3 {
  margin-bottom: 20px;
  font-size: 33px;
  font-weight: 600;
  line-height: 44px;
  color: #333;
}
.register {
  width: 500px;
  height: 500px;
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
form {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.register div {
  border: 1px solid #cfcfcf;
  margin-bottom: 20px;
  height: 40px;
  width: 400px;
  display: flex;
  align-items: center;
  padding: 10px;
}
input[type="text"],
input[type="password"] {
  width: 300px;
  height: 40px;
  font-size: 16px;
  border: none;
  padding-left: 5px;
  outline: none;
  background-color: transparent;
}
input[type="submit"] {
  background-color: black;
  border: none;
  margin-bottom: 10px;
  width: 400px;
  height: 50px;
  font-size: 20px;
  color: white;
}
div .social {
  border: none;
  display: flex;
  flex-direction: column;
}
</style>