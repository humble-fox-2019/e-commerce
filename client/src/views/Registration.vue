<template>
    <div>
        <RegisterForm/>
        <p>Already have account</p>
        <router-link to="/login">Login</router-link>
    </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm'
export default {
    components : {
        RegisterForm
    }
}
</script>

<style>

</style>