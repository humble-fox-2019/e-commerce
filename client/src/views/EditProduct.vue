<template>
  <div class="w-1/2 ml-24 mt-10">
    <div class="mb-4">
      <h1 class="font-bold text-4xl">Product Detail</h1>
      <p class="text-sm">Please update data below.</p>
    </div>
    <form @submit.prevent="submitEdit" enctype="multipart/form-data">
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
        Save
      </button>
    </form>
  </div>
</template>

<script>
import myAxios from '@/configs/myAxios.js'
import errorHandler from '@/configs/errorHandler.js'
import axios from 'axios'

export default {
  name: 'edit-product',
  data() {
    return {
      id: '',
      name: '',
      description: '',
      image: '',
      price: '',
      stock: '',
      errors: []
    }
  },
  methods: {
    submitEdit() {
      // this.$store.commit('auth_request')
      // console.log(this.name)
      let bodyForm = new FormData()
      bodyForm.append('name', this.name)
      bodyForm.append('description', this.description)
      bodyForm.append('image', this.image)
      bodyForm.append('price', this.price)
      bodyForm.append('stock', this.stock)

      // console.log(bodyForm.get('name'))

      // myAxios
      //   .patch(`/products/${this.id}`, {
      //     name: bodyForm.get('name'),
      //     description: bodyForm.get('description'),
      //     image: bodyForm.get('image'),
      //     price: bodyForm.get('price'),
      //     stock: bodyForm.get('stock')
      //   })
      //   .then(({ data }) => {
      //     console.log(data)
      //     this.$store.commit('auth_finished')
      //     this.$router.push('/products')
      //     // this.$emit('login', data)
      //   })
      //   .catch(err => {
      //     this.$store.commit('auth_finished')
      //     this.errors = errorHandler(err)
      //   })

      axios(
        {
          method: 'patch',
          url: 'http://34.87.27.118/products/' + this.id,
          headers: { token: this.$store.state.token }
        },
        bodyForm
      )
        .then(({ data }) => {
          console.log(data)
          this.$store.commit('auth_finished')
          this.$router.push('/products')
          // this.$emit('login', data)
        })
        .catch(err => {
          this.$store.commit('auth_finished')
          console.log(err)
        })
    },
    addPicture() {
      this.image = this.$refs.picture.files[0]
    },
    fetchSingleProduct() {
      this.$store.commit('auth_request')
      myAxios
        .get(`/products/${this.$route.params.id}`)
        .then(({ data }) => {
          this.$store.commit('auth_finished')
          const { _id, name, description, image, price, stock } = data.product
          this.id = _id
          this.name = name
          this.description = description
          this.image = image
          this.price = price
          this.stock = stock
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.fetchSingleProduct()
  }
}
</script>

<style></style>
