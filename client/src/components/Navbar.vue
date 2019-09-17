<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">PosterPedia</router-link>
                    </li>
                    <li class="nav-item" v-if="role==='admin'">
                        <router-link class="nav-link" to="/">Add Product</router-link>
                    </li>
                </ul>
                <div class="nav-item" >
                    <div v-if="isLogin" style="display: flex; align-items:center; justify-content: space-evenly; width: 200px">
                        <div v-if="role === 'customer'">
                            <button><img class="svg" src="../assets/cart.svg" alt="cart"></button>
                        </div>
                        <button @click.prevent="logout()"><i style="font-size: 20px;" class="fas fa-sign-out-alt"></i></button>
                    </div>
                    <div v-else>
                        <button @click.prevent="login()">Login</button>
                    </div>
                </div>

            </div>
        </nav>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    name : "Navbar",
    data: function() {
        return { 
        }
    },
    props: ['isLogin' , 'role'],
    methods : {
        logout: function() {
            Swal.fire({
                title: 'You wanna leave?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Logout!'
            }).then((result) => {
                if (result.value) {
                    localStorage.clear();
                    this.$router.push('/login')
                }
            })
            
        },
        login : function() {
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
    .svg {
        width: 30px;
        height: 30px;
    }
    .nav-item {
        padding: 10px 20px;
    }
  
    li a {
        font-size: 20px;
    }
    div i {
        font-size: 30px;
    }
    button {
        border: none;
        background-color: transparent;
        color:grey;
        outline: none;
    }
    button:hover{
        border: none;
        background-color: transparent;
        color: black;
    }
</style>