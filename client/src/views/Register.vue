<template>
    <div  style="margin-left: auto; margin-right: auto; margin-top: 15vh;">
        <h1 style="font-size: 2rem;">Sign up.</h1>
        <div id="errorPosition">
            <p v-bind:style="{visibility: errorShow}">{{error}}</p>
        </div>
        <form action="">
            <input v-on:keyup.enter="register" v-model="email" type="email" placeholder="Email">
            <input v-on:keyup.enter="register" v-model="username" type="text" placeholder="Username">
            <input v-on:keyup.enter="register" v-model="password" type="password" placeholder="Password">
            <button v-if="loading === false" @click.prevent="register" type="submit">Sign up</button>
            <button v-else type="submit" @click.prevent=""><i class="fas fa-spinner fa-pulse"></i></button>
        </form>
        <div  style="display:flex; flex-direction:column;">
            <router-link to="/login">Have an account?</router-link>
        </div>   
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data: function(){
        return {
            email: "",
            password: "",
            username: "",
            error: "",
            errorShow: "hidden",
            loading: false,
            googleSignInParams: {
                client_id: '917807764644-vpc8agqmpl8v5bn8d273i4te0ojs2b3m.apps.googleusercontent.com'
            }
        }
    },
    methods: {
        register(){
            this.loading = true
            axios({
                url: `${this.$store.state.baseUrl}/users/register`,
                method: 'post',
                data:{
                    email: this.email,
                    password: this.password,
                    username: this.username
                }
            })
            .then(({ data }) =>{
                this.$router.push('/login')
            })
            .catch(err => {
                if(err.response){
                    this.error = err.response.data.message
                }else if(err.request){
                    this.error = "No response from server"
                }
                this.errorShow = "visible"
            })
            .finally(()=>{
                this.loading = false
            })
        }
    }
}
</script>

<style scoped>
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
    form{
        display: flex;
        flex-direction: column;
    }
    p {
        font-family: 'Roboto', sans-serif;
        color: red;
        padding: 5px;
        position: relative;
        bottom: 0px;
        left: 0px;
        word-wrap:break-word;
        width: 100%;
        margin: 0px;
    }
    input, button{
        height: 5vh;
        box-sizing: border-box;
        border-radius: 10px;
        outline: none;
        border: 1px solid #cccccc;
        font-size: 1rem;
        margin-bottom: 1.5vh;
    }
    input {
        padding-left: 1vw;
    }
    button {
        background: #bdc3c7;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #2c3e50, #bdc3c7);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #2c3e50, #bdc3c7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        color: white;
        font-size: 1.3rem;
        margin-top: 3vh;
        margin-bottom: 3vh;
        height: 6vh;
    }
    button:hover {
        -webkit-box-shadow: -2px 2px 9px -2px rgba(33,20,33,1);
        -moz-box-shadow: -2px 2px 9px -2px rgba(33,20,33,1);
        box-shadow: -2px 2px 9px -2px rgba(33,20,33,1);
        transition: all 0.2s ease 0s;
    }

    h4{
        margin: 0px;
        font-family: 'Roboto', sans-serif;
        color: black;
    }

    div{
        
        width: 25vw;
    }
    input:focus{
        box-shadow: 0px 0px 5px #016087;
        transition-duration: 0.2s;
        border-radius: 10px;
    }
</style>