<template>
  <div class="my-product">
    <table cellspacing="0" cellpadding="0">
      <thead>
        <tr>
          <th style="width: 50px">No</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th style="width: 80px">Image</th>
          <th style="width: 150px;">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product._id">
          <td>{{ index+1 + '. ' }}</td>
          <td>{{ product.name }}</td>
          <td>{{ formatPrice(product.price) }}</td>
          <td>{{ product.stock }}</td>
          <td>
          <img :src="product.image">
          </td>
          <td class="action">
            <button class="update" @click="$router.push(`/update/${product._id}`)">Update</button>
            <button class="delete" @click="showConfirmationDelete(product._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="confirmation" v-if="isShowConfirm">
      <h3>Are you sure want to delete ?</h3>
      <button class="yes" @click="deleteProduct()">Yes</button>
      <button class="no" @click="hideConfirm()">Cancel</button>
    </div>
  </div>
</template>

<script>

import axios from '../api/server'

export default {
  name: 'MyProduct',
  data() {
    return {
      products: [],
      isShowConfirm: false,
      id: ''
    }
  },
  methods: {
    formatPrice(price) {
      if(!price) {
        return 0
      }else{
        price = price.toString()
        let newPrice = ''
        let index = 0
        for(let i=price.length-1;i>=0;i--) {
          if(index % 3 == 0 && index != 0) {
            newPrice = '.' + newPrice
          }
          index++
          newPrice = price[i] + newPrice
        }
        return 'Rp. ' + newPrice
      }
    },
    showConfirmationDelete(id) {
      this.id = id
      this.isShowConfirm = true
    },
    hideConfirm() {
      this.id = ''
      this.isShowConfirm = false
    },
    deleteProduct() {
      axios.delete(`/product/${this.id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        let newProducts = []
        for(let i=0;i<this.products.length;i++) {
          let product = this.products[i]
          if(product._id == this.id){
            //skip
          }else {
            newProducts.push(product)
          }
        }
        this.products = newProducts
      })
      .catch(err => {
        this.$router.push('/')
      })
      .finally(_ => {
        this.isShowConfirm = false
      })
    }
  },
  created() {
    axios.get('/product/myproduct', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      this.products = data.products
    })
    .catch(err => {
      this.$router.push('/')
    })
  }
}
</script>

<style scoped>

.my-product{
  max-width: 1100px;
  margin: auto;
  padding: 20px;
}

.my-product table{
  width: 100%;
}

.my-product table th{
  text-align: left;
  background-color: aliceblue;
  padding: 10px;
}
.my-product table td{
  padding: 10px;
}
.my-product table img{
  width: 100%;
  display: block;
  margin: auto;
  border-radius: 10px;
}
tbody tr:nth-child(odd){
  background-color: #ffffff;
}
tbody tr:nth-child(even){
  background-color: #f3f3f3;
}
.action{
  box-sizing: border-box;
}
.action button{
  padding: 5px;
  border: none;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 8pt;
  font-weight: bold;
}
.update{
  color: #ffffff;
  background-color: #43ca34;
}
.update:hover{
  background-color: #5edf50;
}
.delete{
  color: #ffffff;
  background-color: #e72a2a;
}
.delete:hover{
  background-color: #ec4848;
}
.confirmation{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 30px 20px;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0,0,0,.2);
}

.confirmation h3{
  padding: 20px 0;
}
.confirmation button{
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 12pt;
  font-weight: bold;
}

.confirmation button.yes{
  background-color: #f32929;
  color: #ffffff;
  width: 100px;
  margin-right: 10px;
}
.confirmation button.yes:hover{
  background-color: #ff5050;
}
.confirmation button.no{
  border: 2px solid #43ca34;
  background-color: #ffffff;
  width: 110px;
  color: #43ca34;
}
</style>

