<template>
  <div class="brand-list">
    <h1>Brands</h1>
    <div class="brand-wrapper">
      <Brand
        v-for="(image, index) in brands"
        :key="index"
        :image="image">
      </Brand>
    </div>
  </div>
</template>

<script>

import Brand from '../components/Brand.vue'
export default {
  name: 'BrandList',
  components: {
    Brand
  },
  data() {
    return {
      brands: ['https://storage.cloud.google.com/image-ecommerce-josprima-site/asus.png?folder&hl=id&organizationId', 'https://storage.cloud.google.com/image-ecommerce-josprima-site/acer.png?folder&hl=id&organizationId', 'https://storage.cloud.google.com/image-ecommerce-josprima-site/lenovo.png?folder&hl=id&organizationId', 'https://storage.cloud.google.com/image-ecommerce-josprima-site/hp.png?folder&hl=id&organizationId', 'https://storage.cloud.google.com/image-ecommerce-josprima-site/dell.png?folder&hl=id&organizationId']
    }
  }
}
</script>

<style>

.brand-list{
  max-width: 1100px;
  margin: auto;
  padding-bottom: 50px;
}
.brand-list h1{
  font-size: 18pt;
  color: #43ca34;
  padding: 30px 0;
  margin-bottom: 60px;
  border-bottom: 1px solid rgba(0,0,0,.1);
}
.brand-wrapper{
  display: flex;
}
</style>
