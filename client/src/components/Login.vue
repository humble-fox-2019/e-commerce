<template>
  <div class="login">
    <h3>Sign In</h3>
    <form @submit="getLogin">
      <div class="inputBody">
        <input type="text" placeholder="Email" v-model="email" />
      </div>

      <div class="inputBody">
        <input type="password" placeholder="Password" v-model="password" />
      </div>
      <input type="submit" value="Sign In" />
      <p style="font-size: 10px;">
        Don't have an TokoCode Account? Create
        <a
          href="#"
          style="text-decoration: none; color: #187ECF"
          @click="showregister"
        >Here</a>
      </p>

      <div class="social">
        <p>Sign In with Social Account</p>
      </div>
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
      email: "",
      password: ""
    };
  },
  methods: {
    showregister() {
      this.$emit("registerShow");
    },
    getLogin() {
      let email = this.email;
      let password = this.password;
      Swal.fire({
        title: `Loggin In ......`,
        allowOutsideClick: () => !Swal.isLoading()
      });
      Swal.showLoading();
      Axios({
        method: `post`,
        url: `${baseUrl}/users/login`,
        data: {
          email,
          password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.id);
          Swal.close();
          Swal.fire("Success!", data.message, "success");
          this.$emit("toFirstPage");
        })
        .catch(error => {
          let msg = error.response.data.message || "Wrong Email/Password";
          Swal.fire("Error!", msg, "error");
        })
        .finally(() => {
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
.login {
  background-color: #efefef;
  border-radius: 10px;
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
.login .inputBody {
  margin-bottom: 20px;
  height: 40px;
  width: 400px;
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #cfcfcf;
}
input[type="text"],
input[type="password"] {
  width: 400px;
  height: 30px;
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
  height: 40px;
  font-size: 20px;
  color: white;
}
div .social {
  margin-top: 10px;
  height: 60px;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}
</style>