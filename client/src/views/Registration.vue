<template>
  <div class="Registration">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="success" dark flat>
                <v-toolbar-title>Registration form</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Name"
                    name="name"
                    prepend-icon="md-person"
                    type="text"
                    v-model="name"
                  ></v-text-field>

                  <v-text-field
                    label="Email"
                    name="email"
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
                </v-form>
              </v-card-text>
              <v-card-actions style="display:flex;justify-content:center; padding-bottom:30px">
                <div style="display:flex;flex-direction:column;">
                  <v-btn color="success" style="margin-bottom:10px" @click="save">Registration</v-btn>
                  <v-btn to="/login">Already have account?</v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    
    <v-snackbar
      v-model="snackBar"
      :color="snackColor"
      multi-line="multi-line"
      right="right"
      top="top"
      style="white-space: pre-line;"
    >
      {{ snackMsg }}
      <v-btn
        dark
        text
        @click="snackBar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import db from "@/apis/axios";

export default {
  name: "registration",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      snackMsg: "",
      snackColor: "error",
      snackBar: false
    };
  },
  methods: {
    save() {
      db
        .post("/registration", {
          name: this.name,
          email: this.email,
          password: this.password
        }, {
          headers: {
            access_token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          this.snackMsg = "Registration success";
          this.snackColor = "success";
          this.snackBar = true;
          setTimeout(() => { 
            this.$router.push('login');
           }, 1000);
        })
        .catch(err => {
          this.snackMsg = err.response.data.message.join('\n');
          this.snackColor = "error";
          this.snackBar = true;
        })
        .finally(() => {});
    }
  }
};
</script>

<style scoped>
</style>
