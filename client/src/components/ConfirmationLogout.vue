<template>
  <div class="confirmation">
    <h3>Are you sure want to exit ?</h3>
    <button class="yes" @click="$store.commit('signout')">Yes</button>
    <button class="no" @click="$store.commit('toggleConfirm')">Cancel</button>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.confirmation{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 30px 20px;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0,0,0,.2);
}

.confirmation h3{
  padding: 20px 0;
}
.confirmation button{
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 12pt;
  font-weight: bold;
}

button.yes{
  background-color: #f32929;
  color: #ffffff;
  width: 100px;
  margin-right: 10px;
}
button.yes:hover{
  background-color: #ff5050;
}
button.no{
  border: 2px solid #43ca34;
  background-color: #ffffff;
  width: 110px;
  color: #43ca34;
}
</style>
