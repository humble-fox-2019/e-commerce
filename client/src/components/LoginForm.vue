<template>
    <form>
        <h2>Log In</h2>
        <label>Email</label>
        <input type="text" placeholder="Register your email...">
        <label>Password</label>
        <input type="text" placeholder="Enter password...">
        <input type="button" value="Login" @click="$emit('logged-in')">
    </form>
</template>

<script>
export default {

}
</script>

<style>

</style>