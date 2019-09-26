<template>
  <div class="brand">
    <img :src="image" alt="" srcset="">
  </div>
</template>

<script>
export default {
  name: 'Brand',
  props: ['image']
}
</script>

<style scoped>

.brand{
  background-color: #ffffff;
  flex-grow: 1;
  height: 60px;
  border-radius: 5px;
  box-shadow: 0 2px 2px rgba(0,0,0,.2);
  position: relative;
}
.brand img{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.brand:not(:last-child){
  margin-right: 20px;
}

</style>
