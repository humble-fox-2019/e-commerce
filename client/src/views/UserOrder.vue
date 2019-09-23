<template>
  <div class="user-order">
    <table cellspacing="0" cellpadding="0">
      <thead>
        <tr>
          <th style="width: 20px">No</th>
          <th>Product Name</th>
          <th style="width: 80px">Image</th>
          <th>Dijual oleh</th>
          <th>Your purchase</th>
          <th>Order status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orders" :key="order._id">
          <td>{{ index+1 + '. ' }}</td>
          <td>{{ order.product.name }}</td>
          <td>
            <img :src="order.product.image">
          </td>
          <td>{{ order.product.store.name }}<br>{{ order.product.store.city }}, {{ order.product.store.province }}</td>
          <td> {{ order.quantity }} x {{ formatPrice(order.product.price) }}</td>
          <td class="action">
            <div v-if="order.status === 0">
              <span class="status on-confirmation">On-confirmation</span>
            </div>
            <div v-else-if="order.status === 1">
              <span class="status on-delivery">On-delivery</span>
              <button @click="showConfirmationUpdate(order._id)">Confirm</button>
            </div>
            <div v-else-if="order.status === 2">
              <span class="status on-completed">Completed</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="confirmation" v-if="isShowConfirm">
      <h3>Are you sure want to update status ?</h3>
      <div class="confirm-action">
        <button class="yes" @click="updateStatus()">Yes</button>
        <button class="no" @click="hideConfirm()">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>

import axios from '../api/server'

export default {
  name: 'UserOrder',
  data() {
    return {
      orders: [],
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
    showConfirmationUpdate(id) {
      this.id = id
      this.isShowConfirm = true
    },
    hideConfirm() {
      this.id = ''
      this.isShowConfirm = false
    },
    updateStatus() {
      axios.patch(`/transaction/completed/${this.id}`, {}, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          for(let i=0;i<this.orders.length;i++) {
            if(this.orders[i]._id == this.id) {
              this.orders[i].status = 2
            }
          }
          this.hideConfirm()
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  },
  created() {
    axios.get('/transaction', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      this.orders = data
    })
    .catch(err => {
      this.$router.push('/')
    })
  }
}
</script>

<style scoped>

.user-order{
  max-width: 1100px;
  margin: auto;
  padding: 10px;
}

.user-order table{
  width: 100%;
  font-size: 10pt;
}

.user-order table th{
  text-align: left;
  background-color: aliceblue;
  padding: 10px;
}
.user-order table td{
  padding: 10px;
}
.user-order table img{
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
.confirm-action{
  display: flex;
}
.confirmation button{
  flex-grow: 1;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 12pt;
  font-weight: bold;
}

.confirmation button.yes{
  background-color: #43ca34;
  color: #ffffff;
  width: 100px;
  margin-right: 10px;
}
.confirmation button.yes:hover{
  background-color: #54d645
}
.confirmation button.no{
  border: 2px solid #43ca34;
  background-color: #ffffff;
  width: 110px;
  color: #43ca34;
}
.status{
  padding: 5px 10px;
  border-radius: 5px;
}
.on-confirmation{
  background-color: #4bd5da;
  color: #ffffff;
}
.on-delivery{
  background-color: #a864df;
  color: #ffffff;
}
.on-completed{
  background-color: #43ca34;
  color: #ffffff;
}
.action button{
  padding: 8px 10px;
  display: inline-block;
  background-color: #43ca34;
  color: #ffffff;
}
</style>

