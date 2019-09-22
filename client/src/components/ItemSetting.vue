<template>
    <div>
        <div class="image">
            <img :src="product.image" alt="">
        </div>
        <div>
            <p>Name: {{product.title}}</p>
        </div>
        <div>
            <p>Description: {{product.description}}</p>
        </div>
        <div>
            <p>Brand: {{product.brand}}</p>
        </div>
        <div>
            <p>Price: {{product.price}}</p>
        </div>
        <div>
            <p>Quantity: {{product.qty}}</p>
        </div>
        <div style="position:fixed ; bottom: 2vh; right: 8vw;">
            <a href="" @click.prevent="update(product)">Update</a>
        </div>
        <div style="position:fixed ; bottom: 2vh; right: 2vw;">
            <a href="" @click.prevent="remove(product._id)">Delete</a>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import errorHandler from '../js/errorHandler'
export default {
    props: ['product'],
    data: function(){
        return {
           
        }
    },
    methods: {
        update(product){
            this.$emit('update', product)
        },
        remove(id){
            Swal.showLoading()
            axios({
                url: `${this.$store.state.baseUrl}/products/${id}`,
                method: 'delete',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({ data })=>{
                this.$store.dispatch('fetchAllImages')
                Swal.close()
                this.$router.push('/admin')
            })
            .catch(errorHandler)
        }
    }

}
</script>

<style scoped>
    .image{
        width: 70%;
        height: 30%;
        object-fit: contain;
        margin-top: 10vh;
        margin-left: auto;
        margin-right: auto;
    }
    a:hover{
        font-size: 1.5rem;
        transition-duration: 0.4s;
        border-bottom: 1px solid black;
    }
</style>