<template>
  <section id="login-page">
    <div class="container my-5">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div style="width:100%" class="d-flex justify-content-center mb-5">
            <a @click.prevent="$router.push('/home')" href="#">
              <img id="logo-login" src="../assets/logo.png" />
            </a>
          </div>
          <div class="card">
            <div class="card-header">Login</div>
            <div class="card-body">
              <form id="form-login" @submit.prevent="Login">
                <div class="form-group">
                  <label for="input-email">Email</label>
                  <input autofocus type="email" class="form-control" v-model="email" />
                </div>
                <div class="form-group">
                  <label for="input-password">Password</label>
                  <input type="password" class="form-control" v-model="password" />
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
                <hr>
                <p>To create new account <a @click.prevent="$router.push('/register')" href="/register">register here</a></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  mounted() {
    this.Reset();
  },
  methods: {
    ...mapMutations(["setToken", "setAdmin"]),
    Reset() {
      this.email = "";
      this.password = "";
    },
    Login() {
      this.axios({
        url: "/user/login",
        method: "post",
        baseURL: this.baseURL,
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(response => {
          this.Reset();
          const { data } = response;
          this.Swal.fire({
            type: data.type,
            title: data.type,
            text: data.message
          }).then(() => {
            if(data.isAdmin === true) this.setAdmin()
            this.setToken({ token: data.token });
            this.$router.push("/home/list");
          });
        })
        .catch(err => {
          this.Swal.fire({
            type: err.response.data.type,
            text: err.response.data.message
          });
        });
    }
  }
};
</script>

<style>
#logo-login {
  width: 100px;
  height: auto;
}
</style>