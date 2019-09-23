<template>
    <div class="container mt-5 m-custom" v-if="fetched">
        <div class="row" style="display:flex; justify-content:center">
            <div class="col-5">
                <div style="display: flex; justify-content: center;">
                    <div class="img shadow" :style="`background-image: url('${product.imageURL}')`"></div>
                </div>
            </div>
            <div class="col-7 detail pl-5">
                <h1 class="mt-4">Product Detail</h1>
                <hr>
                <h2>{{ product.name }}</h2> 
                <br>
                <div class="row pl-4">
                    <div class="col sub">Stock </div>
                    <div class="col sub">:  </div>
                    <div class="col sub">{{ product.stock }} </div>
                </div>
                <div class="row pl-4">
                    <div class="col sub">Category  </div>
                    <div class="col sub">:  </div>
                    <div class="col sub">{{ product.category }} </div>
                </div>
                <br>
                <div class="sub pl-4">Description  </div> 
                <div class="sub pl-4" style="font-size:20px;">{{ product.description }}</div>
                <br>
                
                <div class="price">Rp {{ price }} <button @click="addToCart(`${ product._id }`)"><i class="fas fa-cart-plus"></i></button></div>

            </div>
        </div>
    </div>
</template>

<script>
import axiosInstance from '../api/axios'
import Swal from 'sweetalert2';

export default {
    props : ['productId'],
    data  () {
        return {
            product: null,
            fetched : false,
            quantity : 0
        }
    },
    methods : {
        convertToRupiah ( num ) {
            let angka = num;
            let rupiah = '';		
            let angkarev = angka.toString().split('').reverse().join('');
            for(let i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
            return rupiah.split('',rupiah.length-1).reverse().join('');
        },
        addToCart( productId ) {
            const token = localStorage.getItem('token')
            if ( this.quantity > this.product.stock ) {

            } else {
                axiosInstance({
                    method: "POST",
                    url : "/products/cart",
                    headers : {
                        token
                    },
                    data : {
                        productId,
                        quantity : 1
                    }
                })
                .then( response => {
                    if ( response.data.message.includes('already in your cart'))
                        Swal.fire( 'Product already added!' , 'please check your cart' , 'info')
                    else
                        Swal.fire( 'Success!' , 'Product succesfully added to cart' , 'success')
                })
            }
            
        }
    },
    computed : {
        price () {
            return this.convertToRupiah( this.product.price )
        },
        subtotal : function () {
            let subtotal = this.product.price * this.quantity
            return this.convertToRupiah( subtotal )
        }
    },
    created () {
        axiosInstance({
            method: "GET",
            url : `/products/detail/${ this.$route.params.id }`,
        })
        .then( response => {
            this.product = response.data 
            this.fetched = true
        })
        .catch( console.log )
    },
    destroyed() {
        this.fetched = false
    }
}
</script>

<style scoped>
    .img{
        width: 100%;
        min-height:600px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
    .detail {
        text-align: left;
    }
    .price {
        font-size: 60px;
    }
    .sub {
        font-size: 25px;
    }
    .m-custom {
        margin-bottom: 50px;  
    }
    .card {
        height: 200px;
    }
    button {
        border: none;
        color: black;
        outline: none;
        
    }
    button:hover {
        color: grey;
    }
</style>