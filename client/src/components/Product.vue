<template>
    <div class="card">
        <div class="img" :style="`background-image:url(${product.imageURL})`"></div>
        <div class="card-body">
            <div class="row head">
                <div class="col name">{{ product.name }}</div>
                <div class="col price" style="padding-top:5px;"><i class="fas fa-coins"></i> {{ price }}</div>
            </div>
            <div class="row subhead">
                <div class="col stock">Stock {{ product.stock }}</div>
                <div class="col category">{{ product.category }}</div>
            </div>
            <div class="detail">
                <h3 class="description">Description: </h3>
                <p class="card-text">{{ product.description }}</p>
            </div>
            <div v-if="role === 'admin'">
                <div class="my-button">
                    <button @click.prevent="updateProduct(`${product._id}`)"><i class="far fa-edit"></i></button>
                    <button @click.prevent="deleteProduct(`${product._id}`)"><i class="far fa-trash-alt"></i></button>
                </div>
            </div>
            <div v-else-if="role === 'customer'">
                <a href="#" @click.prevent="addToCart"><i class="far fa-plus-square"></i></a>
            </div>
        </div>
        
    </div>
</template>

<script>
import axiosInstance from '../api/axios'
import Swal from 'sweetalert2'
export default {
    name: "Product",
    data : function () {
        return {

        }
    },
    props: ['product', 'role'],
    methods: {
        updateProduct( productId ) {
            // abis delete / update fetch
            this.$emit('fetchProducts')
        },
        deleteProduct( productId ) {
            const token = localStorage.getItem('token');
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    axiosInstance({
                        method: "DELETE",
                        url : `/products/${productId}`,
                        headers : {
                            token
                        }
                    })
                    .then( response => {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        this.$emit('fetchProducts')
                    })
                    .catch( err => {
                        this.$buefy.toast.open({
                            duration: 4000,
                            message: err.response.data,
                            type: 'is-danger'
                        })  
                    })
                }
            })
            
            this.$emit('fetchProducts')
        }
    },
    computed : {
        price : function convertToRupiah() {
            let angka = this.product.price;
            let rupiah = '';		
            let angkarev = angka.toString().split('').reverse().join('');
            for(let i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
            return rupiah.split('',rupiah.length-1).reverse().join('');
        }
    }
}
</script>

<style scoped>
    .img{
        width: 100%;
        height:400px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
    .card {
        height :700px;
        width: 300px;
        margin: 20px;
    }
    .head {
        height: 90px;
    }
    .subhead {
        height: 40px;
    }
    .name {
        font-size: 23px;
        font-weight: bold;
    }
    .description {
        margin-top: 15px;
        font-size: 19px;
        text-align: left;
    }
    .card-text{
        text-align: left;
    }
    .detail {
        height: 100px;
    }    
    .group-btn {
        display: flex;
        justify-content: space-evenly;
    }
    .my-button {
        width: 100%;
        height:100%;
        display: flex;
        justify-content: space-evenly;
    }
    .my-button > button {
        width: 100%;
        height: 100%;
        border: none;
        padding: 10px;
        border: 2px solid white;
    }
    .my-button > button:hover{
        /* border: 2px solid #20c997; */
        background-color: wheat;
    }
</style>