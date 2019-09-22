<template>

        <div class="head">
            <div>
                <a @click.prevent="close" class="close"><i class="fas fa-times fa-1x"></i></a>
            </div>
            <div class="flex flex-col">
                <div v-for="(cart, index) in this.$store.state.cart" :key="index" class="image rounded-full">
                    <img :src="cart.image" alt="shoes image">
                </div>
            </div>
            <div class="cart flex justify-end">
                <router-link to="/cart" style="padding-right: 1rem; padding-top: 1rem; padding-bottom:0.4rem">Your cart</router-link>
            </div>
            
        </div>

</template>

<script>
export default {
  data: function () {
    return {

    }
  },
  methods:{
      close(){
          this.$emit('closeinfo')
      }
  }
}
</script>

<style scoped>
    .close {
        position: absolute;
        right: 1vw;
        top: 1vh;
    }
    .cart{
        height: 20%;
        width: 100%;
    }

    .image{
        height: 5rem;
        width: 5rem;
        margin: 10px;
        overflow: hidden;
    }
    .head{
        background-color: white;
        min-height: 15vh;
        max-height: 70vh;
        overflow: scroll;
        width: 10vw;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        -webkit-box-shadow: 0px 3px 13px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 3px 13px 0px rgba(0,0,0,0.75);
        box-shadow: 0px 3px 13px 0px rgba(0,0,0,0.75);
    }

</style>
