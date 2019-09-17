<template>
  <div class="footer">
    <router-link to="/">Home</router-link>
    <router-link to="/">About</router-link>
    <router-link to="/">Contact</router-link>
    <router-link to="/"><img src="https://storage.cloud.google.com/image-ecommerce-josprima-site/favicon.png"> Become a seller</router-link>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>

.footer{
  max-width: 1100px;
  margin: 50px auto 0;
  background-color: rgb(243, 243, 243);
  padding: 100px 20px;
  text-align: center;
  border-radius: 20px 20px 0 0;
}
.footer a{
  padding: 10px;
  color: rgb(77, 77, 77);
}
.footer a:hover{
  font-weight: bold;
}
.footer a:not(:first-child) {
  margin-left: 20px;
}
</style>