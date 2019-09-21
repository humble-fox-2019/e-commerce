<template>
  <div class="h-auto mb-4">
    <div>
      <div class="mx-5" id="container">
        <router-link :to="link">
          <img
            class="object-cover h-full w-full"
            src="@/assets/img/malvestida-magazine-u79wy47kvVs-unsplash.jpg"
            alt=""
          />
        </router-link>
      </div>
      <div class="mx-5 h-auto mt-6 mb-8 flex">
        <div class="w-5/6">
          <h1 class="font-bold">{{ product.name }}</h1>
          <p class="mt-2 text-xs">Rp. {{ product.price }}</p>
        </div>
        <div class="w-1/6 flex justify-center items-center">
          <router-link :to="link" class="focus:outline-none">
            <i class="fas fa-shopping-bag"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myAxios from '@/configs/myAxios.js'
import errorHandler from '@/configs/errorHandler.js'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'product',
  props: ['product'],
  components: {
    Loading
  },
  data() {
    return {
      link: null,
      price: null
    }
  },
  methods: {
    createLink() {
      this.link = '/products/' + this.product._id
    }
  },
  created() {
    // console.log(this.product)
    this.createLink()
  }
}
</script>

<style scoped>
#container {
  width: 300px;
  height: 300px;
}
</style>
