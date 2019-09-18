<template>
  <div class="navbar">
        <ul class="click">
            <router-link to="/" tag="li">About Us</router-link>
            <router-link to="/aboutus" tag="li">Products</router-link>
            <img src='../assets/fuji.svg' alt="">
            <router-link to="/register" tag="li">Register</router-link>
            <router-link to="/login" tag="li">Log In</router-link>
        </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {}
}
</script>

<style scoped>

.navbar {
  background: linear-gradient(rgb(178, 219, 243), white);
  height: 20vh;
  width: 100%;
  font-family: Arial;
}
li{
    color: rgb(14, 0, 10);
    text-decoration:none;
    list-style: none;
    font-weight: bolder
}
.click{
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center
}
img{
    margin-top : 2px;
   height: 16vh;
}

</style>
