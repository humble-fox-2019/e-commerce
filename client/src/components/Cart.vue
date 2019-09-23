<template>
  <div class="cart">
      <button @click="deleteCart(`${ cart._id }`)"><i class="fas fa-times"></i></button>
      <div class="img" :style="`background-image: url('${ cart.productId.imageURL }')`"></div>
      <div style="display: flex; flex-direction:column; text-align:left; width: 30%;">
          <div class="name" >{{ cart.productId.name }}</div>
          <div class="category">Category : {{ cart.productId.category }}</div>
          <div class="category">Rp {{ subtotal }}</div>
      </div>
      <button class="update-btn" @click="minus(`${ cart._id }`)"><i class="fas fa-minus"></i></button>
      <div> {{ cart.quantity }} </div>
      <button class="update-btn" @click="plus(`${ cart._id }`)"><i class="fas fa-plus"></i></button>
  </div>
</template>

<script>
import axiosInstance from '../api/axios'
import Swal from 'sweetalert2'
export default {
    name : "Cart",
    props : ['cart'],
    methods : {
        plus( cartId ) {
            const token = localStorage.getItem('token')
            axiosInstance({
                method:"PATCH",
                url : `/products/cart/${cartId}`,
                headers: {
                    token
                },
                data : {
                    quantity: this.cart.quantity + 1 
                }
            })
            .then( response => {
                this.$store.dispatch('fetchCarts')
            })
            .catch( err => {
                console.log( err.response.data )
            })
        },
        minus( cartId ) {
            if ( this.cart.quantity - 1 <= 0 ) {
                this.deleteCart()
            } else {
                const token = localStorage.getItem('token')
                axiosInstance({
                    method:"PATCH",
                    url : `/products/cart/${cartId}`,
                    headers: {
                        token
                    },
                    data : {
                        quantity: this.cart.quantity - 1 
                    }
                })
                .then( response => {
                    this.$store.dispatch('fetchCarts')
                })
                .catch( err => {
                    console.log( err.response.data )
                })
            }

        },
        deleteCart ( cartId ) {
            const token = localStorage.getItem('token')
            Swal.fire({
                title: 'Delete from cart?',
                text: "Are you sure you want to remove this product from your cart?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!',
                cancelButtonText: 'No!'
            }).then((result) => {
                if (result.value) {
                     axiosInstance({
                        method:"DELETE",
                        url : `/products/cart/${cartId}`,
                        headers: {
                            token
                        }
                    })
                    .then( response => {
                        this.$store.dispatch('fetchCarts')
                    })
                    .catch( err => {
                        console.log( err.response.data )
                    })
                }
            })
        },
        convertToRupiah( num ) {
            let angka = num;
            let rupiah = '';		
            let angkarev = angka.toString().split('').reverse().join('');
            for(let i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
            return rupiah.split('',rupiah.length-1).reverse().join('');
        }
    },
    computed : {
        subtotal () {
            return this.convertToRupiah(( this.cart.quantity * this.cart.productId.price ))
        }
    }
}
</script>

<style scoped>
.cart {
    display: flex;
    align-items: center;
    min-height: 180px;
    justify-content: space-evenly;
}
.img{
    width: 200px;
    height: 140px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: antiquewhite;
}
.name {
    font-size: 20px;
    font-weight: bold;
}
button {
    border: none;
    outline: none;
    font-size: 20px;
    width: 30px;
    height: 30px;
    border-radius: 10px;
}
.update-btn {
    background-color: whitesmoke;
}
button:hover {
    background-color: grey;
}
</style>