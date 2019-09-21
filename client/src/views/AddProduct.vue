<template>
  <div class="w-full ml-24 mt-10">
    <loading :active.sync="isLoading" :is-full-page="true"></loading>

    <div class="mb-4">
      <h1 class="font-bold text-4xl">Product Detail</h1>
      <p class="text-sm">Please input all the details required for the product you want to sell.</p>
    </div>
    <form @submit.prevent="addProduct">
      <div class="mb-2">
        <label for="name">Product Name</label>
        <br />
        <input
          v-model="name"
          class="w-64 px-4 py-1 rounded focus:outline-none mt-2 border-gray-600 border-2 focus:border-black"
          type="text"
          id="name"
        />
      </div>

      <div class="mb-2">
        <label for="name">Description</label>
        <br />
        <input
          v-model="description"
          class="w-64 px-4 py-1 rounded focus:outline-none mt-2 border-gray-600 border-2 focus:border-black"
          type="text"
          id="description"
        />
      </div>

      <div class="mb-2">
        <label for="price">Price per Item</label>
        <br />
        <input
          v-model="price"
          class="w-64 px-4 py-1 rounded focus:outline-none mt-2 border-gray-600 border-2 focus:border-black"
          type="number"
          id="price"
        />
      </div>

      <div class="mb-2">
        <label for="stock">Stock</label>
        <br />
        <input
          v-model="stock"
          class="w-64 px-4 py-1 rounded focus:outline-none mt-2 border-gray-600 border-2 focus:border-black"
          type="number"
          id="stock"
        />
      </div>

      <div class="mb-2">
        <label for="image">Image</label>
        <br />
        <input
          class="w-64 focus:outline-none mt-2"
          type="file"
          ref="picture"
          @change="addPicture"
        />
      </div>

      <div v-if="this.errors" class="mb-3">
        <div v-for="error in errors">
          <p class="text-red-600">{{ error }}</p>
        </div>
      </div>

      <button
        class="hover:bg-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded mt-2 focus:outline-none"
      >
        Sell Now
      </button>
    </form>
  </div>
</template>

<script>
import myAxios from '@/configs/myAxios.js'
import errorHandler from '@/configs/errorHandler.js'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'add-product',
  components: {
    Loading
  },
  data() {
    return {
      name: 'Test',
      description: 'Test',
      image: null,
      price: 5000,
      stock: 5,
      isLoading: false,
      errors: []
    }
  },
  methods: {
    addProduct() {
      this.isLoading = true

      let bodyForm = new FormData()
      bodyForm.append('name', this.name)
      bodyForm.append('description', this.description)
      bodyForm.append('image', this.image)
      bodyForm.append('price', this.price)
      bodyForm.append('stock', this.stock)

      myAxios
        .post('/products', bodyForm)
        .then(({ data }) => {
          console.log(data)
          this.isLoading = false
          this.$router.push('/products')
          // this.$emit('login', data)
        })
        .catch(err => {
          this.isLoading = false
          this.errors = errorHandler(err)
        })
    },
    addPicture() {
      this.image = this.$refs.picture.files[0]
    }
  }
}
</script>

<style></style>
