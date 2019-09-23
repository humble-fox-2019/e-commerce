<template>
  <div>
    <v-app-bar
      app
      dense
      fixed
      dark
      height="135px"
      style="background:linear-gradient(rgb(178, 219, 243), rgba(255, 255, 255, 0.92))"
    >
      <div class="navbar">
        <ul class="click">
          <router-link to="/admin" tag="li" v-if="acsess">
            <v-btn>Admin</v-btn>
          </router-link>
          <router-link to="/" tag="li" v-else>About Us</router-link>
          <router-link to="/products" tag="li">Products</router-link>
          <img src="../assets/fuji.svg" alt />
          <router-link to="/register" tag="li" v-if="!showButton">Register</router-link>
          <router-link to="/login" tag="li" v-if="!showButton">Log In</router-link>
          <li href v-if="showButton">
            <v-btn fab color="indigo" @click="openDialog" dark>
              {{cart.length}}
              <v-icon>mdi-basket</v-icon>
            </v-btn>
          </li>
          <li href v-if="showButton" @click="logoutMe">Log Out</li>
        </ul>
      </div>
    </v-app-bar>
    <v-dialog v-model="dialog" max-width="900px" color="blue" data-app>
      <v-card min-height="650px">
        <v-row justify="center">
          <v-card-title>
            <h2 class="headline">Your Shopping Cart</h2>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(product, index) in formatCart" :key="index" :id="index+'-close'">
                      <td>{{product.productName}}</td>
                      <td>Rp {{(product.price).toLocaleString('id-IDR')}}</td>
                      <td>
                        <v-text-field
                          type="number"
                          @click="totalPerItem"
                          :value="product.quantity"
                          v-model="product.quantity"
                          class="mystyle"
                          min="1"
                          :max="product.stock"
                        ></v-text-field>
                      </td>
                      <td
                        :id="product._id"
                      >Rp {{(product.quantity * product.price).toLocaleString('id-IDR')}}</td>
                      <td>
                        <v-btn @click="deleteCart(product._id)">Delete</v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <h4>Rp {{(totalPayment).toLocaleString('id-IDR')}}</h4>
            </v-container>
          </v-card-text>
          <v-card-actions class="d-flex-center">
            <v-btn-toggle mandatory>
              <v-btn dark @click="closeDialog" class="back" name="back">Back</v-btn>
              <v-btn dark @click="checkOut">Checkout</v-btn>
            </v-btn-toggle>
          </v-card-actions>
        </v-row>
        <br />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
const baseUrl = 'http://35.247.148.217'
// const baseUrl = 'http://localhost:3000'

export default {
  props: ['token', 'buyItem'],
  name: 'Nav',
  data () {
    return {
      showButton: false,
      toCart: {},
      cart: [],
      formatCart: false,
      totalPayment: 0,
      dialog: false,
      acsess: false
    }
  },
  methods: {
    newCart () {
      this.cart = []
      for (let k in this.formatCart) {
        for (let i = 0; i < this.formatCart[k].quantity; i++) {
          this.cart.push({
            _id: this.formatCart[k]._id,
            productName: this.formatCart[k].productName,
            price: this.formatCart[k].price,
            stock: this.formatCart[k].stock
          })
        }
      }
    },
    deleteCart (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.value) {
          let code = id + '-close'
          delete this.formatCart[id]
          document.getElementById(code).style.display = 'none'
          Swal.fire('Deleted!', '', 'success')
          this.newTotal()
        }
      })
    },
    totalPerItem () {
      for (let k in this.formatCart) {
        let temp = document.getElementById(k).innerHTML.split(' ')
        let value = +temp[1].split(',').join('')
        this.formatCart[k].total = value
        this.newTotal()
      }
    },
    newTotal () {
      let save = 0
      for (let k in this.formatCart) {
        save += this.formatCart[k].total
      }
      this.totalPayment = save
    },
    logoutMe () {
      Swal.fire({
        title: 'Are you sure to logout?',
        text:
          "Don't forget to checkout, or after you logout your cart will be empty..",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout'
      }).then(result => {
        localStorage.clear()
        this.showButton = false
        this.acsess = false
        this.$router.push({ path: '/' })
      })
    },
    checkButton () {
      if (this.token || localStorage.token) {
        this.showButton = true
      } else {
        this.showButton = false
      }
    },
    openDialog () {
      if (this.cart.length > 0) {
        this.loopingCart()
        this.dialog = true
      }
    },
    closeDialog () {
      this.newCart()
      this.dialog = false
      this.totalPayment = 0
    },
    loopingCart () {
      let cartloop = {}
      for (let i = 0; i < this.cart.length; i++) {
        cartloop[this.cart[i]._id] = {
          _id: this.cart[i]._id,
          productName: this.cart[i].productName,
          price: this.cart[i].price,
          stock: this.cart[i].stock,
          quantity: 0,
          total: 0
        }
      }
      this.totalPayment = 0
      for (let i = 0; i < this.cart.length; i++) {
        for (let k in cartloop) {
          if (k === this.cart[i]._id) {
            cartloop[k].quantity += 1
            cartloop[k].total += this.cart[i].price
          }
        }
        this.totalPayment += this.cart[i].price
      }
      this.formatCart = cartloop
    },
    checkOut () {
      axios({
        method: 'post',
        url: baseUrl + '/carts/create',
        data: {
          totalPayment: this.totalPayment,
          listItems: this.formatCart
        },
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          this.$toastr.Add({
            title: 'Success',
            msg: 'Your previous cart has been processed',
            clickClose: false,
            timeout: 2000,
            position: 'toast-top-center',
            type: 'info',
            preventDuplicates: true,
            style: {
              backgroundColor: '#095d77',
              width: '525px',
              height: '100px',
              'font-size': '21pt'
            }
          })
          this.dialog = false
          this.toCart = {}
          this.cart = []
          this.formatCart = false
          this.totalPayment = 0
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  watch: {
    token () {
      this.showButton = true
      if (localStorage.role === 'admin') {
        this.acsess = true
        this.$router.push({ path: '/admin' })
      }
    },
    buyItem () {
      if (this.buyItem) {
        this.cart.push(this.buyItem.product)
      }
    },
    cart () {
      this.loopingCart()
    }
  },
  mounted () {
    if (localStorage.token) {
      this.showButton = true
      if (localStorage.role === 'admin') {
        this.acsess = true
        this.$router.push({ path: '/admin' })
      }
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Be+Vietnam|Muli|Roboto|Volkhov&display=swap");
* {
  margin: 0;
  padding: 0;
  font-family: "Volkhov", serif;
}
.theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: rgb(65, 151, 185);
}

.navbar {
  width: 100%;
  font-family: Arial;
}
li {
  color: rgb(14, 0, 10);
  text-decoration: none;
  list-style: none;
  font-weight: bolder;
  cursor: pointer;
  font-size: 16pt;
  color: rgb(34, 14, 53);
}
.click {
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
img {
  margin-top: 2px;
  height: 16vh;
}

.v-card > *:first-child:not(.v-btn):not(.v-chip),
.v-card > .v-card__progress + *:not(.v-btn):not(.v-chip) {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  display: flex;
  justify-content: center;
}
table {
  margin: 0 auto;
  width: 800px;
}
.mystyle {
  width: 40px;
  margin: 0 auto;
  opacity: 1;
}

input[type="number"]::-webkit-inner-spin-button {
  opacity: 1;
}

.back.theme--dark.v-btn[data-v-41458b80]:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background: rgb(251, 255, 5);
}
</style>
