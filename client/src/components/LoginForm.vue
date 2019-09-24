<template>
    <form>
        <h2>Log In</h2>
        <label>Email</label>
        <input type="text" placeholder="Register your email..." v-model="email">
        <label>Password</label>
        <input type="text" placeholder="Enter password..." v-model="password">
        <input type="button" value="Login" @click="login">
    </form>
</template>

<script>
export default {
    data : function () {
        return {
            email : "",
            password : ""
        }
    },
    methods : {
        login : function () {
            this.$store.dispatch('login', { "email" : this.email, "password" : this.password})
        }
    }
}
</script>

<style>

</style>