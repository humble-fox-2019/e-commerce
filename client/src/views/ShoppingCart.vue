<template>
    <ol>
        <li v-for="(product,i) in productsInCart" :key="i" :product="product">{{product.name}}</li>
    </ol>
</template>

<script>
import Product from '@/components/Product'
export default {
    components : {
        Product
    },
    data : function(){
        return {
            productsInCart : [],
            productsInCartDummy : ['susu','sandal','tempe','minyak wangi']
        }
    },
    computed : {
        getCartItems : function(){
            this.productsInCart = this.$store.state.cart.items
        }
    },
    mounted : function(){
        this.getCartItems
    }
}
</script>

<style>

</style>