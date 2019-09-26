<template>
  <div class="add-product">
    <form @submit.prevent="addProduct()" spellcheck="off">
      <h1>Add new product</h1>
      <div>
        <div class="input-group">
          <label for="name">Product Name</label>
          <input type="text" required v-model="name" >
        </div>
        <div class="input-group">
          <label for="description">Description / Spesification</label>
          <textarea name="description" v-model="description"></textarea>
        </div>
        <div class="input-picture">
          <div class="text" v-if="image == ''">
            <span>Add thumbnail image</span>
            <i class="fas fa-camera"></i>
          </div>
          <div class="preview-picture" id="thumb-image">
          </div>
          <input type="file" accept="image/*" class="form-control-file" ref="image" v-on:change="handleImage" required>
        </div>
        <div class="input-group">
          <label for="price">Price</label>
          <input type="number" required v-model="price" >
        </div>
        <div class="input-group">
          <label for="price">Stock</label>
          <input type="number" required v-model="stock" >
        </div>
        <transition name="shake">
          <div class="error" v-if="errors.length > 0">
            <ul>
              <li v-for="(error, index) in errors" :key="index"> {{ error }} </li>
            </ul>
          </div>
        </transition>
        <div class="input-submit">
          <button type="submit" :disabled="btnState">{{btnText}}</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

import axios from '../api/server.js'

export default {
  name: 'Signup',
  components: {
  },
  data() {
    return {
      name: '',
      description: '',
      image: '',
      price: '',
      stock: '',
      errors: [],
      btnText: 'ADD PRODUCT',
      btnState: false
    }
  },
  methods: {
    handleImage () {
      let reader = new FileReader()
      reader.onload = function(e) {
        document.getElementById('thumb-image').style.backgroundImage = `url('${e.target.result}')`
      }
      reader.readAsDataURL(this.$refs.image.files[0])
      this.image = this.$refs.image.files[0]
    },
    addProduct() {
      this.btnState = true
      this.btnText = 'Loading...'

      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('description', this.description)
      formData.append('image', this.image)
      formData.append('price', this.price)
      formData.append('stock', this.stock)

      axios.post('/product', formData, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.$router.push('/myproduct')
        })
        .catch(err => {
          this.errors = err.response.data.errors
          setTimeout(() => {
            this.errors = []
          }, 3000)
        })
        .finally(() => {
          this.btnState = false
          this.btnText = 'ADD PRODUCT'
        })
    },
    setDefaultState() {
      this.name = ''
      this.description = ''
      this.image = ''
      this.price = ''
      this.stock = ''
      this.errors = []
    }
  }
}
</script>

<style scoped>
.add-product{
  max-width: 500px;
  padding: 20px;
  margin: 50px auto;
}
.add-product h1{
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0,0,0,.1);
  color: #43ca34;
}
.input-group{
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
.input-group label{
  margin-bottom: 5px;
}
.input-group input, .input-group textarea{
  padding: 10px;
  font-size: 12pt;
  border: 2px solid #43ca34;
  border-radius: 5px;
}
.input-group textarea{
  height: 100px;
}
.input-group input:focus, .input-group textarea:focus{
  outline: none;
}
.input-submit button{
  padding: 15px 10px;
  font-size: 10pt;
  font-weight: bold;
  color: #ffffff;
  background-color: #43ca34;
  border: none;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
}
.input-submit button:hover{
  background-color: #5adb4c;
}
.input-submit button:focus{
  outline: none;
}
.input-submit button:active{
  transform: scale(0.95);
}
.input-submit button:disabled{
  background-color: #91a08f;
  opacity: 0.6;
  cursor: default;
}
.error{
  margin-bottom: 20px;
}
.error ul{
  list-style: none;
}
.error li{
  color: #fa1a1a;
}
.shake-enter-active{
  animation: shake .5s;
}
.shake-leave-active{
  animation: fadeOut .2s;
}
.input-picture{
  position: relative;
  background-color: rgb(233, 233, 233);
  width: 200px;
  height: 200px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.input-picture .text{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 160px;
  text-align: center;
}
.input-picture input{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
.preview-picture{
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
