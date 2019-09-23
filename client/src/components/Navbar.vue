<template>
  <nav class="p-1 shadow">
    <div class="container d-flex justify-content-between align-items-center">
      <h1 class="m-0">Dirty paws</h1>
      <form class="d-flex justify-content-center align-items-center" style="width: 40%;">
        <i class="fas fa-search" style="font-size: 20px;"></i>
        <input type="text" class="form-control ml-2" autocomplete="off" placeholder="Search dog.." />
      </form>
      <div class="d-flex justify-content-center align-items-center">
        <h4 class="m-0" style="color: grey">{{username}}</h4>
        <button class="btn" @click.prevent="logout()">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data(){
    return{
      username: '',
    }
  },
  methods:{
    logout(){
      localStorage.clear();
      this.$router.push('/');
    }
  },
  created(){
    this.username = localStorage.getItem('username');
  }
};
</script>

<style scoped>
nav {
  width: 100%;
  position: fixed;
  top: 0px;
  z-index: 19999;
  background-color: whitesmoke;
}
button:hover {
  color: grey;
  transition: 0.7s all;
}
button {
  color: black;
  transition: 0.7s all;
  font-size: 20px;
}
input {
  width: 50%;
  transition: width 1s;
  -webkit-transition: width 1s;
}
input:focus {
  width: 100%;
  border-bottom: 3px solid #000;
}
input:hover {
  width: 100%;
  border-bottom: 3px solid #000;
}
input:focus {
  border-bottom: 3px solid #000;
}
</style>
