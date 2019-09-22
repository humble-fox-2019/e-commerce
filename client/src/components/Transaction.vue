<template>
    <div>
        <div class="cart" v-for="(product , index) in this.transaction.product" :key="index">
            <div class="img" :style="`background-image: url('${ product.imageURL }')`"></div>
            <div style="display: flex; flex-direction:column; text-align:left; width: 50%;">
                <div class="name" >{{ product.name }}</div>
                <div class="category">Qty {{ product.quantity }}</div>
                <div class="category">Rp {{ product.price }}</div>
                <div class="category">Subtotal : Rp {{ convertToRupiah(product.quantity * product.price) }}</div>
            </div>
        </div>
        <div class="bot">
            <div style="display: flex; flex-direction:column; justify-content: flex-start ; text-align: right">
                <div class="category" >Buyer : {{ transaction.userId.username }}</div>
                <div class="category">{{ checkoutTime }}</div>
                <div class="total">Total : Rp {{ total }}</div>
                <div class="status">
                    {{ transaction.status }}
                    <div v-if="transaction.status =='pending'" style="fonts-size:25px; color: orange; padding-left:5px;"><i class="fas fa-user-clock"> </i></div>
                    <div v-else-if="transaction.status =='paid'" style="fonts-size:25px; color: lightgreen; padding-left:5px;"><i class="fas fa-check-circle"></i></div>
                </div>
                <button @click="confirm( transaction._id )" class='done-btn' v-if="this.$store.state.role =='admin' && transaction.status == 'pending'">Confirm</button>
            </div>
        </div>
        
        
    </div>
</template>

<script>
import axiosInstance from '../api/axios';
import Swal from 'sweetalert2';
export default {
    name : "Transaction",
    props : ['transaction'],
    methods: {
        convertToRupiah( num ){
            let angka = num;
            let rupiah = '';		
            let angkarev = angka.toString().split('').reverse().join('');
            for(let i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
            return rupiah.split('',rupiah.length-1).reverse().join('');
        },
        confirm( transactionId ) {
            console.log( transactionId )
            const token = localStorage.getItem('token')
            axiosInstance({
                method : "PATCH",
                url : `/transactions/${ transactionId }`,
                headers : {
                    token 
                },
                data : {
                    status : "paid"
                }
            })
            .then( response => {
                Swal.fire('Confirm Success', 'Transaction confirmed' , 'success');
                this.$store.dispatch('fetchTransactions')
            })
            .catch( err => console.log( err.response.data ))
        }
    },
    computed : {
        checkoutTime() {
            let date = new Date( this.transaction.createdAt)
            let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            return `${date.getDate()} ${month[ date.getMonth() ]} ${ date.getFullYear() }`
        },
        total () {
            let products = this.transaction.product;
            let total= 0;
            products.forEach( product => {
                total += product.price
            })
            return this.convertToRupiah( total )
        }
    }
}
</script>

<style scoped>
.total {
    font-weight: bold;
    font-size: 30px;
}
.cart {
    display: flex;
    align-items: center;
    min-height: 180px;
    justify-content: space-evenly;
}
.img{
    width: 200px;
    height: 140px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: antiquewhite;
}
.name {
    font-size: 20px;
    font-weight: bold;
}
button {
    border: none;
    outline: none;
    font-size: 20px;
    border-radius: 10px;
    background-color: wheat;
}
button:hover {
    background-color: antiquewhite;
}
.status {
    font-weight: bold;
    text-transform: uppercase;
    display:flex;
    justify-content: flex-end;
}
.bot {
    display: flex;
    justify-content: flex-end;
    padding:20px 40px;;
}
</style>