<template>
  <div class="container pt-5 d-flex justify-content-center" style="margin-top : 60px;"  > 
    <!-- <h1>
          {{carts}}
    </h1>-->
    <div class="row" v-if="carts.cartList.length">
      <div class="col-xl-8 col-lg-8">
      <table class="table">
        <thead style="background-color : rgb(211, 153, 44); border : none ; ; color : white;">
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>quantity</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style="background-color : whitesmoke; border : none ;">
          <tr v-for="cart in carts.cartList" :key="cart._id">
            <td>{{cart.Product.name}}</td>
            <td>
              <div style>
                <img :src="cart.Product.image" style="max-width : 100%; width : 60px;" />
              </div>
            </td>
            <td v-if="editedId == cart.Product._id">
              <input type="number" v-model="editQty" class="input-qty-edit">
            </td>
            <td v-else>{{cart.quantity}}</td>
            <td>Rp. {{cart.Product.price * cart.quantity}}</td>
            <td v-if="editedId == cart.Product._id"> 
              <input type="button"
              style="background-color : rgb(211, 153, 44); color : white; border : none;"
              value="Save"
              @click="editQtyClick(cart.Product._id)"
              >
            </td>
            <td v-else>
              <input type="button"
              style="background-color : rgb(211, 153, 44); color : white; border : none;"
              value="Edit"
              @click="renderEdit(cart.Product._id , cart.quantity)"
              >
            </td>
            <td v-if="editedId == cart.Product._id">
              <input
                type="button"
                style="background-color : pink; color : white; border : none;"
                value="Cancel"
                @click="cancel"
              />
            </td>
            <td v-else>
              <input
                type="button"
                style="background-color : pink; color : white; border : none;"
                value="delete"
                @click="deleteCart(cart.Product._id)"
              />
            </td>
            <!-- {{increment(cart.Product.price)}} -->
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-xl-4 col-lg-4">
      <div class="card ringkasan-card">
        <div class="card-body ringkasan-dalam d-flex flex-column justify-content-between">
          <h5 class="card-title">Ringkasan Belanja</h5>
          <h6 class="card-subtitle mb-2 text-muted">Total Harga</h6>
          <p class="card-text">Rp. {{PriceTotal}}</p>
        </div>
      </div>
      <div class="pt-2" >
        <input type="text" placeholder="Masukkan Alamat Pengiriman"   style="width : 90%;" class="mt-2" v-model="alamat" />
        <input type="button" class="checkout-button" style="width : 90%;" value="CheckOut" @click="checkOut" />
      </div>
    </div>
    </div>
    <div v-else > 
      <p class="no-cart">You have not Cart List....</p>
      <p class="no-cart">Silahkan Masukkan Produk ke Card </p>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      totalHarga: 0,
      alamat : '',
      editedId : '',
      editQty : ''
    };
  },
  mounted() {
    this.$store.dispatch("GetCart");
  },
  computed: {
    carts() {
      return this.$store.state.cartList;
    },
    PriceTotal() {
      return this.$store.state.TotalHarga;
    }
  },
  methods: {
    cancel (){
      this.editedId = ''
      this.editQty = ''
    },
    editQtyClick (id){
      axios({
            url: `http://34.87.84.241/cart/${id}`,
            method: "PATCH",
            headers: {
              token: localStorage.getItem("token")
            },
            data : {
              qty : this.editQty
            }
          })
          .then(({data})=>{
            this.editedId = ''
            this.editQty = ''
            console.log( data.newData , ' IMPORTANT')
            this.$store.commit('CARTCHANGE' , data.newData )
            this.carts = {}
            // console.log(data)
          })
          .catch(err=>{
            // console.log(err.response)
            this.$swal(
                'Error',
                err.response.data.message,
                'warning'
              )
          })
    },
    renderEdit(id,qty){
      this.editQty = qty
      this.editedId = id
    },
    deleteCart(id) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios({
            url: `http://34.87.84.241/cart/${id}`,
            method: "DELETE",
            headers: {
              token: localStorage.getItem("token")
            }
          })
            .then(data => {
              this.$swal(
                'Deleted!',
                'Your product has been deleted from your cart.',
                'success'
              )
              this.$store.dispatch("GetCart");
              console.log(data);
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
    },
    checkOut (){
      this.$swal({
        title: 'Are you sure want to CheckOut ?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I want To CheckOut'
      }).then((result) => {
        if (result.value) {
           axios({
            url: `http://34.87.84.241/cart/checkout`,
            method: "POST",
            headers: {
              token: localStorage.getItem("token")
            },
            data : {
              alamat : this.alamat,
              totalHarga : this.PriceTotal,
            }
          })
            .then(data => {
              this.$router.push({ path : '/transaksiuser' })
              this.$swal('Transaction Succes!!' , '' , 'success');
              // this.$store.commit('AFTERCHECKOUT' , '');
              // this.carts.cartList = []
              // console.log(data);
            })
            .catch(err => {
              this.$swal( 'error',
                err.response.data.message  , 'warning'
                )
              console.log(err , ' >>>>>>>>>>>>>');
            });
        }
      })
    }
  }
};
</script>

<style scoped>
* {
     font-size: 18px;
    font-weight: 70px;
    font-family: 'Nunito Sans', sans-serif;
}
.input-qty-edit {
  width: 20%;
}
.checkout-button {
  background-color: rgb(211, 153, 44);
  border: none;
  color: white;
  border-radius: 0,3rem;
}
.ringkasan-card {
  background-color: rgb(211, 153, 44);
  color: white;
  border-radius: 0.5rem;
}
.ringkasan-dalam h5, h6 , p {
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 190px;
  font-size: 20px;
}
.no-cart {
  color: rgb(211, 153, 44);
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 190px;
  font-size: 60px;
}
</style> 