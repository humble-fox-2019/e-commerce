<template>
  <div class="slider">
    <div class="control">
      <button class="left" @click="index <= 0 ? index=2:index--">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button class="right" @click="index >= 2 ? index=0:index++">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
    <div class="slider-wrapper">
      <transition name='slide'>
        <SliderItem v-if="index===0"
          :slide = "slides[index]"
          :id="index">
        </SliderItem>
        <SliderItem v-else-if="index===1"
          :slide = "slides[index]"
          :id="index">
        </SliderItem>
        <SliderItem v-else-if="index===2"
          :slide = "slides[index]"
          :id="index">
        </SliderItem>
      </transition>
    </div>
  </div>
</template>

<script>

import SliderItem from '../components/SliderItem'
export default {
  name: 'Slider',
  components: {
    SliderItem
  },
  data() {
    return {
      index: 0,
      slides: [{
        image: 'https://storage.cloud.google.com/image-ecommerce-josprima-site/gaming.png',
        title: 'Gaming',
        color: '#43ca34'
      },{
        image: 'https://storage.cloud.google.com/image-ecommerce-josprima-site/multimedia.png',
        title: 'Multimedia',
        color: '#ffcc78'
      },{
        image: 'https://storage.cloud.google.com/image-ecommerce-josprima-site/work.png',
        title: 'Work',
        color: '#43ca34'
      }]
    }
  }
}
</script>

<style scoped>
.slider{
  max-width: 1100px;
  margin: 60px auto;
  padding: 20px;
  position: relative;
}
.control button{
  padding: 20px;
  border: none;
  background-color: rgba(255, 255, 255, .6);
  box-shadow: 0 2px 4px rgba(11, 71, 5, .2);
  border-radius: 5px;
  cursor: pointer;
}
.control button:focus{
  outline: none;
}
.left{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 20px;
}
.right{
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}
.slide-enter-active{
  animation: fadeInLeft 2s;
}
.slide-leave-active{
  animation: fadeInRight .2s reverse;
}

</style>
