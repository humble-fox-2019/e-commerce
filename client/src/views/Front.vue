<template>
  <div id="app">
    <div>
      <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000;z-index: 0;"
        fade
        indicators
        img-width="1024"
        img-height="480"
        class="d-flex justify-content-center align-items-center"
      >
        <!-- <Navbar></Navbar> -->
        <b-carousel-slide
          img-src="https://images.unsplash.com/photo-1526660690293-bcd32dc3b123?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
        ></b-carousel-slide>
        <b-carousel-slide
          img-src="https://images.unsplash.com/photo-1532397476918-0b485c271c7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        ></b-carousel-slide>
        <b-carousel-slide
          img-src="https://images.unsplash.com/photo-1562165742-5fb25d795480?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        ></b-carousel-slide>
        <b-carousel-slide
          img-src="https://images.unsplash.com/photo-1562165741-e047f33d5c8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        ></b-carousel-slide>
      </b-carousel>
      <div class="testing d-flex justify-content-center align-items-center">
        <SignForm></SignForm>
      </div>
    </div>
  </div>
</template>
<script>
import SignForm from "../components/SignForm"
export default {
  data(){
    return{
      isLogin: false,
    }
  },
  components: {
    SignForm,
  },
  created(){

  }
};
</script>
<style>
b-carousel-slide{
  object-fit: cover;
}
img {
  /* width: 100vh; */
  max-height: 100vh;
  object-fit: cover;
}
.testing {
  height: 100vh;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
#app {
  min-height: 100vh;
  background-color: #262626;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
