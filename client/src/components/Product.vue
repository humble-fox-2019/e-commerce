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
            <div v-if="$store.state.role === 'admin'">
                <div class="my-button">
                    <!-- <button @click.prevent="updateProduct(`${product._id}`)"><i class="far fa-edit"></i></button> -->
                    <b-button id="show-btn" style="outline:none"  @click="$bvModal.show(`update-product-modal-${ product._id }`)"><i class="far fa-edit"></i></b-button>
                    <div>
                        <b-modal :id="`update-product-modal-${product._id}`" hide-footer>
                            <h2 style="text-align: center;">Update Product</h2>
                            <form>
                                <div class="row">
                                    <div class="col-2"><label>Name</label></div>
                                    <div class="col-10"> <input type="text" placeholder="Avangers" v-model="productUpdate.name"> </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-2"><label>Rp</label></div>
                                    <div class="col-10"> <input type="number" placeholder="200000" min="0" v-model="productUpdate.price"> </div>
                                </div>
                                <div class="row">
                                    <div class="col-2"> <label>Stock</label> </div>
                                    <div class="col-10"> <input type="number" placeholder="12" min="0" v-model="productUpdate.stock" ></div>
                                </div>
                                <div class="row">
                                    <div class="col-2"> <label>Category</label> </div>
                                    <div class="col-10"> <input type="text" placeholder="action" v-model="productUpdate.category"> </div>
                                </div>
                                <label>Previous Photo</label>
                                <img :src="this.product.imageURL" alt="image" width="50%" class="shadow">
                                <label>Product Photo</label>
                                <input type="file" placeholder="action" v-on:change="handlefileupload($event)">

                                <label> Product Description :</label>
                                <b-form-textarea style="outline:none !important;" class="text-area" id="textarea" v-model="productUpdate.description" placeholder="description here . . . " rows="3" max-rows="6"></b-form-textarea>
                                <b-button class="mt-3 submit-btn" block @click.prevent="updateProduct(`${product._id}`)">Update</b-button>
                            </form>
                        </b-modal>
                    </div>
                    <button @click.prevent="deleteProduct(`${product._id}`)"><i class="far fa-trash-alt"></i></button>
                </div>
            </div>
            <div v-else-if="$store.state.role === 'customer'">
                <!-- <a href="#" @click.prevent="addToCart"><i class="far fa-plus-square"></i></a> -->
                <router-link :to="`/detail/${ product._id }`" class="view-btn">View Detail</router-link>
                <!-- <a href="#" @click.prevent="addToCart">View Detail</a> -->
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
            productUpdate : {
                name : "",
                price : "",
                stock : 0,
                category : "",
                description : "",
                file: ""
            }
        }
    },
    props: ['product', 'role'],
    methods: {
        handlefileupload(event) {
            let file = event.target.files || event.dataTransfer.files;
            this.productUpdate.file = file[0];
        },
        updateProduct( productId ) {
            const token = localStorage.getItem('token');
            let formData = new FormData();

            formData.set("file", this.productUpdate.file);
            formData.set("name", this.productUpdate.name);
            formData.set("price", this.productUpdate.price);
            formData.set("stock", this.productUpdate.stock);
            formData.set("category", this.productUpdate.category);
            formData.set("description", this.productUpdate.description);

            Swal.fire({
                title: 'Are you sure?',
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, update it!'
            }).then((result) => {
                if (result.value) {
                    axiosInstance({
                        method: "PUT",
                        url : `products/${ this.product._id }`,
                        data : formData ,
                        headers :{
                            token
                        }
                    })
                    .then( response => {
                        this.$store.dispatch('fetchProduct')
                        Swal.fire(
                            'Updated!',
                            'Your file already updated.',
                            'success'
                        )
                    })
                    .catch( err => {
                        Swal.fire('Error', err.response.data[0] , 'error')
                    })
                }
            })
            .catch( _ => { console.log })
            
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
                        this.$store.dispatch('fetchProduct')
                    })
                    .catch( err => {
                        Swal.fire('Error', err.response.data , 'error')
                        // this.$buefy.toast.open({
                        //     duration: 4000,
                        //     message: err.response.data,
                        //     type: 'is-danger'
                        // })  
                    })
                }
            })
            .catch( console.log )
            this.$store.dispatch('fetchProduct')
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
    },
    created () {
        this.productUpdate = {
            name : this.product.name,
            price : this.product.price,
            stock : this.product.stock,
            category : this.product.category,
            description : this.product.description,
            file: this.product.file
        }
    }
}
</script>

<style scoped>
    .view-btn {
        border-radius: 20px;
        padding: 10px 20px;
        background-color: wheat;
        color : black;
        text-decoration: none;
    }
    .view-btn:hover{
        background-color: antiquewhite;
    }
    button{
        outline: none;
    }   
    .submit-btn {
        border: none;
        border-radius: 20px;
        background-color: bisque !important;   
        color: black;
    }
    .submit-btn:hover {
        border-radius: 20px;
        background-color: sandybrown !important;   
    }
    .img{
        width: 100%;
        height:400px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
    .card {
        height :700px;
        width: 400px;
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
    .btn-secondary {
        outline: none !important;
        color: black !important;
        background-color: white;
    }
    form input {
        margin: 10px 0px;
        width: 100%;
        padding: 5px 10px;
        border-radius: 20px;
        border: none;
        outline: none;
        background-color: lightgray;
        border: 2px solid lightgray

    }
    form label {
        margin: 10px 0px;
        width: 100%;
        padding: 5px 10px;
    }
    form > input:focus {
        border: 2px solid black
    }
</style>