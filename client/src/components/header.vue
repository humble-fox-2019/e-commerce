<template>
  <div class="navbarout" id="navbarTokenFalse">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img src="../assets/LogoMakr_4DLPBp.png" class="logo-pic-nav" alt srcset />
      </a>

      <div class="btn-group ml-auto">
        <form action class="mr-5 formbar">
          <input type="text" placeholder="search" name="search" class="searchbar" id="search" />
          <button
            type="submit"
            id="submitsearch"
            class="searchButton"
            style="border-radius: 10%"
          >Submit</button>
        </form>
        <!-- <a href="#" onclick="signOut();" class="btn btn-outline-warning ml-2 rounded-lg">Sign out</a> -->
        <a href="#" id="logOut" class="btn btn-danger" @click.prevent="signOut">Sign out</a>
        <b-button variant="success" class="chart ml-2">Chart</b-button>
        <b-button variant="info" class="add-product ml-2">Add Product</b-button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    signOut() {
      console.log("masuk ke bagian clear");
      localStorage.clear();

      this.$router.push("/");
    }
  }
};
</script>   

<style>
.logo-pic-nav {
  height: 60px;
}
</style>