<template>
  <div id="loginForm">
    <b-container>
      <h4>Login</h4>
      <b-alert :style="{visibility:errorShow}" variant="danger" show fade>{{errorMessage}}</b-alert>
      <b-form>
        <b-form-group id="loginEmailGroup" label="Email:" label-for="loginEmail">
          <b-form-input
            id="loginEmail"
            v-model="email"
            type="email"
            required
            placeholder="Enter email"
            class="border-left-0 border-right-0 border-top-0"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="loginPasswordGroup" label="Password:" label-for="loginPassword">
          <b-form-input
            id="loginPassword"
            v-model="password"
            required
            placeholder="Enter password"
            type="password"
            class="border-left-0 border-right-0 border-top-0"
          ></b-form-input>
        </b-form-group>
        <b-button
          id="loginButton"
          v-if="loading === false"
          @click.prevent="login"
          type="submit"
        >Login</b-button>
        <b-button id="loginButton" v-else type="submit" @click.prevent>
          <i class="fas fa-spinner fa-pulse"></i>
        </b-button>
      </b-form>
      <div id="loginOption">
        <g-signin-button
          :params="googleSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError"
        >Sign in with Google</g-signin-button>
      </div>
      <br />
      <p>
        Don't have an account? Click here to
        <a
          href
          id="register-button"
          @click.prevent="showRegisterForm"
        >register.</a>
      </p>
    </b-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#loginForm {
  max-width: 50%;
  padding: 20px;
  margin-top: 10px;
  font-family: "Nunito";
}
#loginEmailGroup {
  margin-top: 20px;
}
#loginButton {
  display: inline-block;
  background-image: linear-gradient(to bottom right, #09203f, #537895);
  border: none;
  box-shadow: 0px 10px 10px -5px #111;
}
.g-signin-button {
  margin-top: 10px;
  display: inline-block;
  background-color: #3c82f7;
  border: none;
  box-shadow: 0px 10px 10px -5px #0f69ff;
  color: #fff;
}
</style>