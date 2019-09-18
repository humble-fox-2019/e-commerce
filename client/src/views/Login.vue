<template>
      <v-app style="background: white;">
  <div class='box'>
    <div>
      <img src='../assets/chill.jpg' alt srcset />
    </div>

    <div class='circle'>
      <v-form action class='formLogin' @submit.prevent='registMe'>
        <h2>Login</h2>
        <br>
        <label for>Name</label>
            <v-text-field background-color="white"></v-text-field>
        <label for>Email</label>
            <v-text-field background-color="white"></v-text-field>
        <label for>Password</label>
            <v-text-field background-color="white"></v-text-field>
            <br>
        <v-btn>Submit</v-btn>
      </v-form>
    </div>
  </div>
      </v-app>
</template>

<script>
export default {
  data () {
    return {
      message: 'login'
    }
  }
}
</script>

<style scoped>

.box {
  display: flex;
  justify-content: space-between;
  align-items: space-between;
}
.circle {
  margin: 38px 80px 50px 50px;
  height: 550px;
  width: 480px;
  background: linear-gradient(rgb(244, 215, 247), rgb(194, 223, 240));
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
img {
  margin: 90px 50px 50px 62px;
  height: 500px;
  display: flex;
}

.formLogin {
  margin-top: 58px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

h2{
  margin-top: -8px;
  margin-bottom: 7px;
  font-size: 34px;
}

label {
  margin-top: 2px;
  margin-bottom: 1px
}

.v-text-field{
    width: 58%;
}
</style>
