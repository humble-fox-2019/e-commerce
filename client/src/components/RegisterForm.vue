<template>
    <form>
        <h2>Register</h2>
        <label>Email</label>
        <input type="text" placeholder="Register your email..." v-model="email">
        <p>{{email}}
        <label>Password</label>
        <input type="text" placeholder="Enter password..." v-model="password">
        <p>{{password}}</p>
        <input type="button" value="Register" @click="register">
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
        register : function () {
            console.log(this.password)
            this.$store.dispatch('register', { email : this.email, password : this.password})
        }
    }
}
</script>

<style>

</style>