<template>
    <div>
        This is the details page of product : {{id}}
        <div v-for="(product,i) in products" :key="i">
            <div v-if="product._id == id">
                <h1>{{product.description}}</h1>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'ProductDetails',
    data : function () {
        return {
            products : [],
            id : this.$route.params.id
        }
    },
    watch: {
    '$route' (to, from) {
        this.id = this.$route.params.id
      // react to route changes...
        }
    },
    computed : {
        getProducts : function(){
            this.products = this.$store.state.products
        }
    },
    mounted : function (){
        this.getProducts
    }
}
</script>

<style>

</style>