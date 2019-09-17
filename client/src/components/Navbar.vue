<template>
    <nav>
        <v-toolbar drak color="success white--text">
            <v-toolbar-title class="text-uppercase ">
                <span>Tive</span>
                <span class="font-wight-black">store</span>
            </v-toolbar-title>
            
            <v-spacer></v-spacer>
            
            <v-btn text>
                <v-icon left>mdi-home</v-icon>
                <span>Home</span>
            </v-btn>
            
            <v-btn text class="ml-2">
                <v-icon left>mdi-basket</v-icon>
                <span>Cart</span>
            </v-btn>
        </v-toolbar>
    </nav>
</template>

<script>
export default {
    data() {
        return {
             drawer: false
        }
    }
};
</script>

<style>
</style>