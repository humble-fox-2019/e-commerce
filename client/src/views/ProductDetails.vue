<template>
    <div>
        Hello
    </div>
</template>

<script>
export default {
    name : 'product',
    data : function () {
        return {
            id : this.$route.params.id
        }
    }
}
</script>

<style>

</style>