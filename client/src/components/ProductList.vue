<template>
    <div id="productList">
        <h1>Product List</h1>
        <div class="row" style="display: flex; justify-content: center">
            <div v-for="product in products" :key="product._id">
                <Product :product="product" @fetchProducts="fetchProducts" :role='role'></Product>
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
    props: ['products' , 'role'],
    components: {
        Product
    },
    methods: {
        fetchProducts() {
            this.$emit('fetchProducts')
        }
    },
    created () {
        this.fetchProducts();
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