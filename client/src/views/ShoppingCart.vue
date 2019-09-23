<template>
    <ol>
        <Product v-for="(product,i) in productsInCart" :key="i" :product="product"/>
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
            productsInCart : ['susu','sandal','tempe','minyak wangi']
        }
    }
}
</script>

<style>

</style>