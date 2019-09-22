<template>
    <div class="root">
        <div class="registerItem">
            <form  method="post">
                <input v-model="title" type="text" placeholder="Item's title">
                <input v-model="description" type="text" placeholder="Item's description">
                <input v-model="price" type="text" placeholder="Item's price">
                <input v-model="qty" type="text" placeholder="Item's qty">
                <input v-model="brand" type="text" placeholder="Nike, Adidas or New Balance ?">
            </form>
            <form action="" @submit.prevent="publish" enctype="multipart/form-data">
                <input
                    id="gambar"
                    type="file"
                    ref="image"
                    accept="image/*"
                    v-on:change="handleImage">
                <button v-if="!id" type="submit">Register this item</button>
                <button v-else type="submit">Update this item</button>
            </form>
        </div>
        <div class="listItem">
            <h1 style="text-align: center; margin-top: 3vh; font-size: 1.5rem; padding: 2vh;">All items</h1>
            <div class="shoes">
                <div @click="itemDetail(product)" class="box" v-for="(product, index) in this.$store.state.allProducts" :key="index">
                    <div style="width: 30%; height: 90%;">
                        <img class="small" :src="product.image" alt="">
                    </div>
                    <div>
                        <p v-text="product.title"></p>
                    </div>
                </div>
            </div>

        </div>
        <div class="itemDescription">
            <router-view :product="product" @update="update"></router-view>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import errorHandler from '../js/errorHandler'
export default {
    data: function(){
        return {
            id: "",
            title: "",
            description: "",
            price: "",
            qty: "",
            brand: "",
            items: [],
            product: null,
            


        }
    },
    methods: {
        update(product){
            this.id = product._id
            this.title = product.title
            this.description = product.description
            this.price = product.price
            this.qty = product.qty
            this.brand = product.brand
        },
        itemDetail(product){
            this.$router.push(`/admin/${product._id}`)
            this.product = product
        },
        handleImage(){
            this.image = this.$refs.image.files[0]
        },
        publish(){
            Swal.showLoading()
            let formData = new FormData()

            formData.append('image', this.image)
            formData.append('title', this.title)
            formData.append('description', this.description)
            formData.append('price', Number(this.price)) 
            formData.append('qty', Number(this.qty))
            formData.append('brand', this.brand)
            let url = ""
            let method = ""
            if(this.id){
                url = `${this.$store.state.baseUrl}/products/${this.id}`
                method = 'put'
            }else{
                url = `${this.$store.state.baseUrl}/products`
                method = 'post'
            }
            console.log(url, method)
            axios({
                url,
                method,
                data: formData,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({ data }) => {
                Swal.close()
                this.resetForm()
                this.$store.dispatch('fetchAllImages')

            })
            .catch(errorHandler)
        },
        resetForm(){
            this.id = ""
            this.title = ""
            this.description = ""
            this.price = ""
            this.qty = ""
            this.brand = ""
            document.getElementById("gambar").value = ""
        }
    },
    created(){
        this.$store.dispatch('fetchAllImages')
    } 
}
</script>

<style scoped>
    .shoes{
        overflow: scroll;
        height: 80vh;
        width: 100%;
    }
    .box{
        height: 20vh;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        border-radius: 20px;
        margin-bottom: 2vh;
        display: flex;
        align-items: center;
        justify-content: space-around;
        -webkit-box-shadow: 7px 9px 18px -6px rgba(0,0,0,0.75);
        -moz-box-shadow: 7px 9px 18px -6px rgba(0,0,0,0.75);
        box-shadow: 7px 9px 18px -6px rgba(0,0,0,0.75);
    }
    form{
        display: flex;
        flex-direction: column;
    }
    h1 {
        margin-top: 0px;
        margin-bottom: 0px;
        font-family: 'Roboto', sans-serif;
    }
    #errorPosition{
        height: 8vh; 
        display:flex; 
        justify-items: start;
        align-items: flex-end;
        
    }
    .switch:hover {
      border-bottom: 2px solid grey;
    }
    .small {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }
    input:not(#gambar) , button {
        height: 5vh;
        box-sizing: border-box;
        border-radius: 10px;
        outline: none;
        border: 1px solid #cccccc;
        font-size: 1rem;
        margin-bottom: 1.5vh;
    }
    #gambar {
        outline: none;
        border-radius: 10px;
    }
    input { 
        padding-left: 1vw;
    }
    input:not(#gambar):focus{
        box-shadow: 0px 0px 5px #016087;
        transition-duration: 0.2s;
        border-radius: 10px;
    }
    button {
        font-family: 'Roboto', sans-serif;
        background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(90,92,106,1) 0%, rgba(32,45,58,1) 81.3% );
        color: white;
        font-size: 1.3rem;
        margin-top: 3vh;
        margin-bottom: 3vh;
        height: 6vh;
    }
    .registerItem {
        position: relative;
        top: 10vh;
        margin-left: auto;
        width: 80% ;
    }
    button:hover {
        -webkit-box-shadow: -2px 2px 9px -2px rgba(33,20,33,1);
        -moz-box-shadow: -2px 2px 9px -2px rgba(33,20,33,1);
        box-shadow: -2px 2px 9px -2px rgba(33,20,33,1);
        transition: all 0.2s ease 0s;
    }

    .root{
        display: grid;
        grid-template-columns: 1fr 2fr 2fr;
        height: 92vh;
        grid-gap: 30px;
        overflow: hidden;
    }
</style>