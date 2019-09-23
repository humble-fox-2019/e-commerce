<template>
  <section id="register-page">
    <div class="container my-5">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div style="width:100%" class="d-flex justify-content-center mb-5">
            <a @click.prevent="$router.push('/home')" href="#"><img id="logo-register" src="../assets/logo.png" /></a>
          </div>
          <div class="card">
            <div class="card-header">Register</div>
            <div class="card-body">
              <form id="form-register" @submit.prevent="Register">
                <div class="form-group">
                  <label for="input-name">Name</label>
                  <input autofocus type="text" class="form-control" v-model="name" />
                </div>
                <div class="form-group">
                  <label for="input-email">Email</label>
                  <input type="email" class="form-control" v-model="email" />
                </div>
                <div class="form-group">
                  <label for="input-password">Password</label>
                  <input type="password" class="form-control" v-model="password" />
                </div>
                <button type="submit" class="btn btn-primary">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  mounted() {
    this.Reset();
  },
  methods: {
    Reset() {
      this.name = "";
      this.email = "";
      this.password = "";
    },
    Register() {
      this.axios({
        url: "/user/register",
        method: "post",
        baseURL: this.baseURL,
        data: {
          name: this.name,
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
            this.$router.push("/login");
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
#logo-register {
  width: 100px;
  height: auto;
}
</style>