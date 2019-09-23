<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">PosterPedia</router-link>
                    </li>
                    <li class="nav-item" v-if="role">
                        <button @click.prevent='goToTransaction()' class="ml-3" style="border-radius: 5px; padding: 10px; outline: none !important; background-color:wheat">Transactions</button>
                    </li>
                    <li class="nav-item" v-if="role==='admin'">
                        <b-button id="show-btn" @click="$bvModal.show('bv-modal-example')" style=" border-radius:5px; padding: 10px; outline: none !important; background-color:wheat">Add Product</b-button>
                        <div>
                            <b-modal id="bv-modal-example" hide-footer>
                                <h2 style="text-align: center;">Add New Product</h2>
                                <form>
                                    <div class="row">
                                        <div class="col-2"><label>Name</label></div>
                                        <div class="col-10"> <input type="text" placeholder="Avangers" v-model="product.name"> </div>
                                    </div>
                                    
                                    <div class="row">
                                        <div class="col-2"><label>Rp</label></div>
                                        <div class="col-10"> <input type="number" placeholder="200000" min="0" v-model="product.price"> </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-2"> <label>Stock</label> </div>
                                        <div class="col-10"> <input type="number" placeholder="12" min="0" v-model="product.stock" ></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-2"> <label>Category</label> </div>
                                        <div class="col-10"> <input type="text" placeholder="action" v-model="product.category"> </div>
                                    </div>

                                    <label>Product Photo</label>
                                    <input type="file" placeholder="action" v-on:change="handlefileupload($event)">

                                    <label> Product Description :</label>
                                    <b-form-textarea style="outline:none !important;" class="text-area" id="textarea" v-model="product.description" placeholder="description here . . . " rows="3" max-rows="6"></b-form-textarea>
                                    <b-button class="mt-3 submit-btn" block @click.prevent="addNewProduct">Submit</b-button>
                                </form>
                            </b-modal>
                        </div>
                    </li>
                    
                </ul>
                <div class="nav-item" >
                    <div v-if="isLogin" style="display: flex; align-items:center; justify-content: space-evenly; width: 200px">
                        <div v-if="role === 'customer'">
                            <button class="cart" @click="goToCart()" style="outline: none !important;"><img class="svg" src="../assets/cart.svg" alt="cart"></button>
                        </div>
                        <button @click.prevent="logout()" style="outline: none !important;"><i style="font-size: 20px;" class="fas fa-sign-out-alt"></i></button>
                    </div>
                    <div v-else>
                        <button @click.prevent="login()" style="outline: none !important;">Login</button>
                    </div>
                </div>

            </div>
        </nav>
                            
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import axiosInstance from '../api/axios'
export default {
    name : "Navbar",
    data: function() {
        return { 
            product : {
                name : "",
                price : 0,
                stock : 0,
                category : "",
                description : "",
                file: ""
            }
        }
    },
    props: ['isLogin' , 'role'],
    methods : {
        goToCart: function() {
            this.$router.push('/cart').then(_=>{}).catch(_=>{})
        },
        goToTransaction : function () {
            this.$router.push('/transactions').then(_=>{}).catch(_=>{})
        },
        logout: function() {
            Swal.fire({
                title: 'You wanna leave?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Logout!'
            }).then((result) => {
                if (result.value) {
                    localStorage.clear();
                    this.$router.push('/login').catch( _ => {})
                }
            })
            
        },
        login : function() {
            this.$router.push('/login').catch( _ => {} )
        },
        handlefileupload(event) {
            let file = event.target.files || event.dataTransfer.files;
            this.product.file = file[0];
        },
        addNewProduct: function() {
            const token = localStorage.getItem('token');
            let formData = new FormData();
		    formData.set("file", this.product.file);
            formData.set("name", this.product.name);
            formData.set("price", this.product.price);
            formData.set("stock", this.product.stock);
            formData.set("category", this.product.category);
            formData.set("description", this.product.description);
            
            Swal.showLoading();
            axiosInstance({
                url : "/products",
                method: "POST",
                headers : {
                    token
                },
                data : formData 
            })
            .then ( response => {
                Swal.close()
                Swal.fire('Success' , 'your product added succesfully' , 'success');
                this.$store.dispatch('fetchProduct')
                
            })
            .catch ( err => {
                console.log( err.response )
                Swal.close();
                Swal.fire('Error' , err.response.data[0] , 'error');
            })
            this.product = {
                name : "",
                price : 0,
                stock : 0,
                category : "",
                description : ""
            }
        }
    }
}
</script>

<style scoped>
    .btn:focus,.btn:active:focus,.btn.active:focus,
    .btn.focus,.btn:active.focus,.btn.active.focus {
        outline: none !important;
        box-shadow:none !important;
        background-color: white;
    }
    .btn:focus {
        border:none !important;    }
    .submit-btn {
        border-radius: 20px;
        background-color: bisque;   
        color: black;
    }
    .submit-btn:hover {
        border-radius: 20px;
        background-color: sandybrown;   
    }
    .svg {
        width: 30px;
        height: 30px;
    }
    .svg:hover {
        width: 40px;
        height: 40px;
    }
    .nav-item {
        padding: 10px 20px;
    }
    li a , li b-button{
        font-size: 20px;
        outline: none;
    }
    div i {
        font-size: 30px;
    }
    button {
        border: none;
        background-color: transparent;
        color:grey;
        outline: none;
    }
    button:hover{
        border: none;
        background-color: transparent;
        color: black;
    }
    button:focus {
        outline:none !important;
        border:white
    }
    .my-button > button {
        outline:none !important;
        border:white

    }
    button:visited {
        outline:none !important;
        border:white

    }
    button:target {
        outline:none !important;
        border:white
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
    .text-area {
        width: 100%;
        padding: 5px 10px;
        border-radius: 20px;
        border: none;
        outline: none;
        background-color: lightgray;
        border: 2px solid lightgray
    }
    .text-area:focus {
        border: 2px solid black;
        background-color: lightgray;

    }
    input[type="file"] {
        margin-top:0;
        width: 100%;
    }

</style>