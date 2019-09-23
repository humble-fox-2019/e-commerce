<template>
  <div class="registerLogin mt-5">
    <img src="../assets/LogoMakr_4DLPBp.png" alt srcset />
    <div class="backgroundLogin">
      <!-- CONTAINER UNTUK REGISTER DAN LOGIN -->
      <div class="containerRegisterLogin">
        <div class="b-container homepage flex-box d-flex text-center">
          <!-- REGISTER PART -->

          <div class="banner-outer register-form">
            <div class="banner-inner">
              <h1 class="welcome-register" style="color:white; font-weight: bold;">New User?</h1>
              <p style="font-weight: bold; color: brown;">Register Now!</p>
              <form>
                <table>
                  <tr>
                    <td>Name</td>
                    <td>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="your name"
                        v-model="name"
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="your email"
                        v-model="email"
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Password</td>
                    <td>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="your password"
                        v-model="password"
                        required
                      />
                    </td>
                  </tr>
                </table>
                <br />
                <div class="btn-group">
                  <a
                    href="#"
                    class="btn-register btn btn-success"
                    type="click"
                    @click.prevent="register"
                  >Register</a>
                </div>
                <!-- <button @click="onSignIn">Continue with Google></button> -->

                <br />
              </form>
              <br />
            </div>
          </div>
          <!-- LOGIN PART -->

          <div class="banner-inner ml-5">
            <h1 class="welcome-login" style="font-weight: bold; color: brown;">Login Now</h1>

            <!-- <p class="motto" style="font-weight: bold; color: brown;">Login Now!</p> -->
            <form action class="mt-5">
              <table>
                <tr>
                  <td>Email</td>
                  <td>
                    <input
                      type="text"
                      name="email"
                      id="emailLogin"
                      placeholder="your email"
                      v-model="emailLogin"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Password</td>
                  <td>
                    <input
                      type="password"
                      name="password"
                      id="passwordLogin"
                      placeholder="your password"
                      v-model="passwordLogin"
                      required
                    />
                  </td>
                </tr>
              </table>
              <br />
              <a href class="btn-loginId btn btn-success" @click.prevent="login">login now</a>
              <br />
            </form>
            <br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const baseUrl = "http://localhost:3000/user";
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      emailLogin: "",
      passwordLogin: ""
    };
  },
  mounted() {
    console.log("masuk");
  },
  // BAGIAN LOGIN NORMAL
  methods: {
    login() {
      console.log("masuk ke bagian login bro");
      let obj = {
        email: this.emailLogin,
        password: this.passwordLogin
      };
      console.log(obj, "<<<  masuk ke bagian login");
      axios({
        method: "POST",
        url: `${baseUrl}/login`,
        data: obj
      })
        .then(({ data }) => {
          this.$router.push("/mainpage");
          localStorage.setItem("token", data.token);
          this.$emit("login");
          this.emailLogin = "";
          this.passwordLogin = "";
        })
        .catch(err => {
          console.log(err.message, "<<<< ini errornyaa broooh");
        });
    },

    // BAGIAN REGISTER
    register() {
      console.log("masuk ke register cok");
      let obj = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      console.log();
      axios({
        method: "POST",
        url: `${baseUrl}/register`,
        data: obj
      })
        .then(({ data }) => {
          this.name = "";
          this.email = "";
          this.password = "";
          this.$emit("fromRegister", data);
        })
        .catch(({ err }) => {
          console.log(err, "disini errornya");
        });
    }
  }
};
</script>


<style>
.backgroundLogin {
  height: 500px;
  /* width: 100%; */
  background: url("../assets/roxanne-desgagnes-di1tfXuDdOg-unsplash.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
}
.containerRegisterLogin {
  width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(232, 238, 234, 0.3);
  border-radius: 5%;
  display: flex;
  justify-content: center;
}
</style>

