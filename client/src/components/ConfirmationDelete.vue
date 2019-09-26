<template>
  <dic class="confirmation">
    <div class="confirm">
      <h3>Are you sure want to delete ?</h3>
      <button class="yes" @click="$emit('confirm', true)">Yes</button>
      <button class="no" @click="$emit('confirm', false)">Cancel</button>
    </div>
  </dic>
</template>

<script>
export default {

}
</script>

<style scoped>

.confirmation{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,.4);
  z-index: 999;
}
.confirm{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 30px 20px;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0,0,0,.2);
}

.confirm h3{
  padding: 20px 0;
}
.confirm button{
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
