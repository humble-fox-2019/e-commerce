<template>
    <div class="flex justify-center mt-6">
        <div style="width:80vw;" class="flex flex-col ">
            <h1 style="border-bottom: 3px solid black " class="text-4xl">Your items</h1>
            <div class="flex flex-col">
                <div v-for="(cart, index) in this.$store.state.cart" :key="index">
                    <div class="row flex" style="height: 15vh; border-bottom:1px solid grey;">
                        <div class="image flex items-center" style="width:25%; height: 100%">
                            <img :src="cart.image" class="px-10" style="height:80%" alt="">
                        </div>
                        <div class="name flex flex-col items-center justify-center" style="width:55%; height: 100%; text-overflow: ellipsis;">
                            <h1 class="px-10 text-1xl" style="font-size: 1.2rem; font-weight: 700;">{{cart.title}}</h1>
                            <p>{{cart.description}}</p>
                        </div>
                        <div class="price flex items-center" style="width:20%; height: 100%">
                            <h1 class=" px-10 text-1xl">$ {{cart.price}}</h1>
                        </div>
                    </div>
                </div>
            </div>        
        </div>
        <button @click="removeCart" class="checkout">Checkout</button>
    </div>
</template>

<script>
import axios from 'axios'
import errorHandler from '../js/errorHandler'
export default {
    data: function(){
        return {

        }
    },
    methods:{
        removeCart(){
            axios({
                url: `${this.$store.state.baseUrl}/users/cart`,
                method: 'delete',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({ data })=>{
                Swal.fire({
                    type: 'success',
                    title: 'Yay..',
                    text: `Enjoy your shoes!!`
                })
                this.$store.dispatch('fetchCart')
                this.$router.push('/')
            })
            .catch(errorHandler)
        }
    },
    created(){
        this.$store.dispatch('fetchCart')
    }
}
</script>
<style scoped>
    .checkout {
        position: fixed;
        right: 2vw;
        bottom: 2vh;
        background-color: black;
        color: white;
        padding: 0.5vh 1vw;
        border-radius: 20px;
        font-size: 2rem;
    }
</style>