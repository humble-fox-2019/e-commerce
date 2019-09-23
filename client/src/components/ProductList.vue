<template>
    <div id="productList">
        <h1>Product List</h1>
        <div class="row" style="display: flex; justify-content: center">
            <div v-for="product in $store.state.products" :key="product._id">
                <Product :product="product" :role='role'></Product>
            </div>
        </div>
    </div>
</template>

<script>
import Product from '../components/Product'
import axiosInstance from '../api/axios'

export default {
    name : "ProductList",
    data: function() {
        return {
            
        }
    },
    props: ['role'],
    components: {
        Product
    },
    methods: {
        
    },
    created () {
        this.$store.dispatch('fetchProduct')
    }
}
</script>

<style scoped>
    #productList {
        margin: 20px;
    }
    h1 {
        font-size: 70px;
        margin: 50px 0px;
    }
</style>