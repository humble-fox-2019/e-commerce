<template>
  <div class="slider-item">
    <img :src="slide.image" alt="" srcset="">
    <div class="text">
      <h1>{{slide.title}}</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, repudiandae! Natus rerum aliquam quo aperiam ducimus corporis dolorem sed magnam nulla consequatur fugiat voluptate quisquam, officiis quos autem et veniam.</p>
      <button :style="'color: ' + slide.color + ';'">Shop now</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlideItem',
  props: ['slide']
}
</script>

<style>

.slider-item img{
  width: 100%;
}
.text{
  position: absolute;
  top: 50%;
  left: 100px;
  transform: translateY(-50%);
  max-width: 500px;
}
.text h1{
  color: #ffffff;
  font-size: 32pt;
}
.text p{
  margin: 50px 0;
  color: #ffffff;
}
.text button{
  border: none;
  padding: 15px 40px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(13, 67, 7, .2);
  font-size: 10pt;
  font-weight: bold;
}

</style>
