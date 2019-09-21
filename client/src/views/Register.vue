<template>
  <div class="register">
      <v-content>
      <v-container class="fill-height container" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="success" dark flat>
                <v-toolbar-title>Register form</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field label="Name" name="name" prepend-icon="md-person" type="text"></v-text-field>
                  
                  <v-text-field label="Email" name="email" prepend-icon="md-person" type="email"></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="md-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="success">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container {
  height: 100vh;
  background-image: url('http://eskipaper.com/images/blurred-background-1.jpg')
}
</style>