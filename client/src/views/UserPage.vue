<template>
  <div class="user-page">
    <div class="page">
      <div class="sidebar">
        <h2>Menu</h2>
        <nav>
          <router-link to="/account">Dashboard</router-link>
          <router-link to="/account/cart">My Cart</router-link>
          <router-link to="/account/order">My Order</router-link>
        </nav>
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.user-page{
  max-width: 1100px;
  margin: auto;
  padding: 20px;
}
.page{
  display: flex;
}
.sidebar{
  flex-basis: 100px;
  flex-grow: 1;
  padding: 10px;
  margin-right: 20px;
}
.sidebar h2{
  font-size: 12pt;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #e6e6e6;
}
.sidebar nav{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.sidebar nav a{
  display: inline-block;
  padding: 10px;
  border-radius: 5px;
  font-size: 10pt;
  color: #575757;
}
.sidebar nav a:not(:last-child) {
  margin-bottom: 20px;
}
.sidebar nav a.router-link-exact-active{
  background-color: rgb(220, 255, 200);
  color: #43ca34;
  font-weight: bold;
}
.main{
  flex-basis: 600px;
  flex-grow: 6;
  padding: 30px 20px 20px;
  border-radius: 5px;
  box-shadow: 0 10px 30px rgba(0,0,0,.05);
}
</style>
