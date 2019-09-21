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
          <th style="width: 200px;">Action</th>
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
            <button class="detail" @click="detail(product._id)">Detail</button>
            <button class="update" @click="update(product._id)">Update</button>
            <button class="delete" @click="remove(product._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import axios from '../api/server'

export default {
  name: 'MyProduct',
  data() {
    return {
      products: []
    }
  },
  methods: {
    formatPrice(price) {
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
      router.push('/')
    })
  }
}
</script>

<style>

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
.detail{
  color: #ffffff;
  background-color: #43ca34;
}
.detail:hover{
  background-color: #5edf50;
}
.update{
  color: #ffffff;
  background-color: #1c9ed1;
}
.update:hover{
  background-color: #3ab1e0;
}
.delete{
  color: #ffffff;
  background-color: #e72a2a;
}
.delete:hover{
  background-color: #ec4848;
}
</style>

