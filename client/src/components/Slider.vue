<template>
  <div class="slider">
    <div class="control">
      <button class="left">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button class="right">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
    <div class="slider-wrapper">
      <SliderItem
        v-for="(item, index) in slides"
        :key = "index"
        :image ="item.image"
        :title = "item.title"
        :color = "item.color">
      </SliderItem>
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
.left{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
}
.right{
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

</style>
