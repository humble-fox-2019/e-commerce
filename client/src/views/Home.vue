<template>
    <div class="home">
        <ProductList @fetchProducts='fetchProducts' :products='products' :role='role'></ProductList>
    </div>
</template>

<script>
// @ is an alias to /src
import Product from '../components/Product'
import ProductList from '../components/ProductList'

import router from "../router"
import axiosInstance from '../api/axios'

export default {
    name: "home",
    data : function () {
        return {
            products : [],
            role : 'customer'
        }
    },
    components: {
        ProductList
    },
    methods : {
        fetchProducts(){
            axiosInstance({
                method:"GET",
                url: '/products'
            })
            .then( response => {
                this.products = response.data
            })
            .catch( err => {
                console.log( err.response )
            })
        }
    },
    created: function() {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        this.role = role;
        if( token ) {
            this.isLogin = true;
        } else {
            this.isLogin = false;
        }
    }
};
</script>
