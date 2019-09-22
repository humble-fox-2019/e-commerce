<template>
  <div class="login">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-form v-on:submit.prevent="onSubmit">
              <v-card class="elevation-12">
                <v-toolbar color="success" dark flat>
                  <v-toolbar-title>Login form</v-toolbar-title>
                  <div class="flex-grow-1"></div>
                </v-toolbar>
                <v-card-text>
                  <v-text-field
                    label="Email"
                    name="Email"
                    prepend-icon="md-person"
                    type="email"
                    v-model="email"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="md-lock"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions style="display:flex;justify-content:center; padding-bottom:30px">
                  <div style="display:flex;flex-direction:column;">
                    <v-btn type="submit" color="success" style="margin-bottom:10px">Login</v-btn>
                    <v-btn to="/registration">register</v-btn>
                  </div>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    
    <v-snackbar
      v-model="snackbar"
      color="error"
      multi-line="multi-line"
      right="right"
      top="top"
      style="white-space: pre-line;"
    >
      {{ error }}
      <v-btn
        dark
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    
  </div>
</template>

<script>
import db from "@/apis/axios";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
      snackbar: false
    };
  },
  methods: {
    onSubmit() {
      db
        .post('login', {
          email : this.email,
          password: this.password
        })
        .then(({data}) => {
          localStorage.setItem('token', data.access_token);
          localStorage.setItem('userData', JSON.stringify(data.userData));
          this.$store.commit('setToken', data.access_token);
          this.$store.commit('setUserData', data.userData);
          
          this.$router.push('/');
        }).catch((err) => {
          if(err.response.data) {
            // console.log(err.response.data);
            this.error = err.response.data.message.join('\n');
            this.snackbar = true
          } else {
            console.log(err);
          }
        });
    }
  }
};
</script>

<style scoped>
</style>