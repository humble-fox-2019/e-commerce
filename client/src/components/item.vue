<template>

        <div class="head">
            <div class="image">
                <img :src="product.image" alt="">
            </div>
            <div class="desc">
                <div class="flex justify-start items-end">
                    <div class="flex flex-col">
                        <p class="text-sm">{{product.brand}}</p>
                        <p class="text-sm">{{product.title}}</p>
                        <p class="text-sm">$ {{product.price}}</p>
                        <p v-if="product.qty" class="text-sm">in Stock</p>
                        <p v-else style="color: red;">Not available</p>
                    </div>
                </div>
                <div class="flex justify-end items-end">
                    <a href="" v-if="product.qty" @click.prevent="showinfo(product._id)" ><i class="fas fa-shopping-cart"></i></a>     
                </div>
            </div>
        </div>

</template>

<script>
import axios from 'axios'
import errorHandler from '../js/errorHandler'
export default {
    props: ['product'],
    data: function () {
        return {
            
        }
    },
    methods:{
        showinfo(id){
            if(!localStorage.getItem('token')){
                 Swal.fire({
                    type: 'info',
                    title: 'Hmm..',
                    text: `You need to log in first! Sorry`
                })
                this.$router.push('/login')
            }else{
                axios({
                    url: `${this.$store.state.baseUrl}/users/cart/${id}`,
                    method: 'patch',
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(({ data })=>{
                    this.$store.dispatch('fetchCart')
                    this.$emit('showinfo') 
                })
                .catch(errorHandler)
            }
        }
    }
}
</script>

<style scoped>
.head{
     height: 55vh;
     width: 15vw;
     margin: 20px;
     /* padding: 10px; */
     position: relative;
 }
 .image{
     height: 75%;
     width: 100%;
     overflow: hidden;
 }
 .desc{

     height: 25%;
     width: 100%;
     display: flex;
     justify-content: space-between;
     position: absolute;
     bottom: 0px;
 }

</style>
