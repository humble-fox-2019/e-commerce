<template>
    <ol>
        
        <Product v-for="(product,i) in products" :key="i" :product="product"/>
    </ol>
</template>

<script>
import store from '@/store.js'

import Product from '@/components/Product'
export default {
    components : {
        Product
    },
    data : function(){
        return {
            productsDummy : ['susu','sandal','tempe','minyak wangi'],
            products : []
        }
    },
    computed : {
        getProducts : function(){
            this.products = this.$store.state.products
        }
    },
    mounted : function (){
        this.$store.dispatch('getProducts')
        //console.log('woy')
        this.getProducts
    }
}
</script>

<style>

</style>