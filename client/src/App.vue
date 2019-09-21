<template>
  <div id="app">
      <Navbar :isLogin= 'isLogin' :role="role"></Navbar>
      <router-view @changeLoginStatus="changeLoginStatus" @reset='reset'/>
  </div>
</template>

<script>
import router from './router'
import Navbar from './components/Navbar'

export default {
    name : "App",
    data : function () {
        return {
          isLogin : false,
          role : null
        }
    },
    methods: {
        changeLoginStatus ( status ) {
            this.isLogin = status;
            if ( status ) {
            this.role = localStorage.getItem('role')
            } else {
            this.role = null
            }
        },
        reset () {
            this.isLogin = false;
            this.role = null
        }
    },
    created : function () {
        const token = localStorage.getItem('token')
        
        if ( token ) {
            this.changeLoginStatus( true )
            this.role = localStorage.getItem('role');
        } else {
            this.changeLoginStatus ( false )
            this.reset()
        }
            this.$router.push('/').catch( _ => {})

    },
    components: {
        Navbar
    }
}
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
