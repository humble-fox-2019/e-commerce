<template>
    <li>
        {{product.name}}
        <input type="button" @click="goToProductPage(product._id)" value="Product page"/>
        <input type="button" @click="addItemToCart(product)" value="Add to Cart"/>
    </li>
</template>

<script>
import store from '@/store.js'

export default {
    props : {
        product : Object
    },
    methods : {
        goToProductPage : function (prodId) {
            let id = prodId
            this.$router.push({ name: 'product', params: { id } })
        },
        addItemToCart : function (product) {
            this.$store.commit('addItem', product)
        }
    }
}
</script>

<style>

</style>