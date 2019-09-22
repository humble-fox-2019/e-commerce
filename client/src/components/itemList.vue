<template>
    <div>
        <div class="list">
            <item class="box" v-for=" (product, index) in this.$store.state.allProducts" :key="index" :product="product" @showinfo="showinfo"/>
        </div>
        <transition name=bounce>
            <itemdesc class="info" v-if="show" @closeinfo="closeinfo"/>
        </transition>
    </div>
</template>

<script>
import item from './item'
import itemdesc from './ItemDescription'

export default {
  data: function () {
    return {
        show: false
    }
  },
  methods:{
      showinfo(){  
        this.show = true  
      },
      closeinfo(){
        this.show = false
      }
  },
  components: {
    item,
    itemdesc
  }
}
</script>

<style scoped>
    .bounce-enter-active {
        animation: slide .5s;
    }
    .bounce-leave-active {
        animation: slide .5s reverse;
    }
    @keyframes slide {
        0%{
            left: -40vw
        }
        100%{
            left: 0vw
        }
    }
    .info{
        position: fixed;
        left: 0px;
        top: 20vh;
    }
    .list {
        display: grid;

        grid-template-columns: 1fr 1fr 1fr 1fr;

    }
</style>
