<template>
  <v-app id="inspire">
    <navbar></navbar>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Register form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom></v-tooltip>
                <v-tooltip right></v-tooltip>
              </v-toolbar>
              <v-form @submit.prevent="register">
                <v-card-text>
                  <v-text-field
                    label="name"
                    name="name"
                    prepend-icon="person"
                    type="text"
                    v-model="name"
                  ></v-text-field>
                  <v-text-field
                    label="email"
                    name="email"
                    prepend-icon="email"
                    type="text"
                    v-model="email"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" type="submit">Register</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import navbar from "../components/navbar";
import Swal from "sweetalert2";
import axios from "axios";
export default {
  components: {
    navbar
  },
  data() {
    return {
      name: "",
      password: "",
      email: ""
    };
  },
  methods: {
    register() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false,
        loader: "dots",
        color: "#23374d"
      });
      axios({
        method: "POST",
        url: "http://35.225.201.56/user/register",
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          loader.hide();
          this.$toast.success("You account is registered", "Success");
        })
        .catch(error => {
          loader.hide()
          let message =
            (error.response.data && error.response.data.message) ||(error.response.data && error.response.data.totalError[0]) ||
            "Failed to register";
          this.$toast.error(message, "Error");
        });
    }
  }
};
</script>

<style>
</style>