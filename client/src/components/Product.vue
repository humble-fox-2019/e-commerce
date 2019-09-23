<template>
    <li>
        {{product.name}}
        <input type="button" @click="goToProductPage(product)" value="Product page"/>
        <input type="button" @click="addItemToCart(product)" value="Add to Cart"/>
         <router-view></router-view>
    </li>
</template>

<script>
import store from '@/store.js'

export default {
    props : {
        product : Object
    },
    methods : {
        goToProductPage : function (product) {
            let id = product._id
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