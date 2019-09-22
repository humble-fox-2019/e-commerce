<template>
<div>
<v-app-bar app dense fixed dark height="135px" style="background:linear-gradient(rgb(178, 219, 243), rgba(255, 255, 255, 0.92))" >
  <div class="navbar">
    <ul class="click">
      <router-link to="/" tag="li">About Us</router-link>
      <router-link to="/products" tag="li">Products</router-link>
      <img src="../assets/fuji.svg" alt />
      <router-link to="/admin" tag="li" v-if="acsess">Admin</router-link>
      <router-link to="/register" tag="li" v-if="!showButton">Register</router-link>
      <router-link to="/login" tag="li" v-if="!showButton">Log In</router-link>
      <li href v-if="showButton">
        <v-btn fab color="indigo" @click="openDialog" dark>{{cart.length}}
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
          <v-card-title >
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
                        <v-text-field type="number" @click="totalPerItem" :value="product.quantity" v-model="product.quantity" class="mystyle" min="1" :max="product.stock" >
                          </v-text-field></td>
                      <td :id="product._id">Rp {{(product.quantity * product.price).toLocaleString('id-IDR')}}</td>
                      <td><v-btn @click="deleteCart(product._id)">Delete</v-btn></td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table> 
              <h4>Rp {{(totalPayment).toLocaleString('id-IDR')}}</h4>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="purple" dark @click="closeDialog">Cancel</v-btn>
            <v-btn color="pink" dark ></v-btn>
          </v-card-actions>
        </v-row>
        <br />
      </v-card>
</v-dialog>
</div>
</template>

<script>
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
    deleteCart(id){
      let code = id+'-close'
      delete this.formatCart[id]
      document.getElementById(code).style.display="none"
      this.newTotal()
    },
    totalPerItem(){
      console.log('hereeee');
      for (let k in this.formatCart){
        let temp = document.getElementById(k).innerHTML.split(' ')
        let value = +temp[1].split(',').join('')
        this.formatCart[k].total = value
        this.loopingCart()
      }
    },    
    newTotal(){
      let save = 0
      for (let k in this.formatCart){
        save += this.formatCart[k].total
      }
      this.totalPayment = save
    },
    logoutMe () {
      localStorage.clear()
      this.showButton = false
      this.acsess = false
      this.$router.push({ path: '/' })
    },
    checkButton () {
      console.log('heiiii')
      console.log()
      if (this.token || localStorage.token) {
        this.showButton = true
      } else {
        this.showButton = false
      }
    },
    openDialog () {
      if (this.cart.length > 0){
        this.loopingCart()
        this.dialog = true
      }
    },closeDialog(){
      let total = 0
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
      // console.log(cartloop);
      this.totalPayment =0
        for (let i = 0; i < this.cart.length; i++) {
          for (let k in cartloop) {
          if (k == this.cart[i]._id) {
            cartloop[k].quantity += 1
            cartloop[k].total += this.cart[i].price
          }
        }
        this.totalPayment += this.cart[i].price
      }
      this.formatCart = cartloop
    },
    newCart(){
      for (let k in this.formatCart){
        for (let i =0 ; i< this.formatCart)
      }
    }
  },
  watch: {
    token () {
      this.showButton = true
    },
    buyItem () {
      if (this.buyItem) {
        this.cart.push(this.buyItem.product)
      }
    },
    cart(){
      this.loopingCart()
    },
    formatCart(){
      console.log('heeelloo');
    }
  },
  mounted () {
    if (localStorage.token) {
      this.showButton = true
      if (localStorage.role === 'admin') {
        this.acsess = true
      }
    }
  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0
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

.v-card > *:first-child:not(.v-btn):not(.v-chip), .v-card > .v-card__progress + *:not(.v-btn):not(.v-chip) {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    display: flex;
    justify-content: center;
}
table{
  margin: 0 auto;
  width: 800px
}
.mystyle{
  width : 40px;
  margin: 0 auto;
  opacity: 1;
}

input[type=number]::-webkit-inner-spin-button {
    opacity: 1
}

</style>
