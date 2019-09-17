<template>
  <div class="header">
    <div class="logo">
      <img src="../assets/tokopadia.png" alt="" srcset="">
    </div>
    <div class="search-box">
      <form>
        <div class="input-search">
          <label for="search">
            <i class="fa fa-search" aria-hidden="true"></i>
          </label>
          <input
            type="text"
            placeholder="Search product"
            id="search">
        </div>
      </form>
    </div>
    <div class="menu">
      <router-link to="/" class="active">Home</router-link>
      <router-link to="/">Product</router-link>
      <router-link to="/">Signin</router-link>
      <router-link to="/">Signup</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>

.header{
  max-width: 1100px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px auto;
  padding: 20px;
  border-bottom: 1px solid rgba(0,0,0,.1);
}
.logo img{
  width: 150px;
}
.input-search{
  width: 300px;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 4px 2px rgba(0,0,0,.1);
}
.input-search input{
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  border: none;
  font-size: 12pt;
}
.input-search input:focus{
  outline: none;
}
.input-search label{
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  color: rgba(0,0,0,.3);
}
.menu a{
  display: inline-block;
  padding: 10px;
  border-radius: 5px;
  color: rgb(61, 61, 61);
}
.menu a.active{
  font-weight: bold;
  background-color: rgb(233, 233, 233);
}
.menu a:hover{
  background-color: rgb(233, 233, 233);
}
.menu a:not(:first-child){
  margin-left: 20px;
}
</style>
