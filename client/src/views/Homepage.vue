<template>
    <div >
        <div class="background flex justify-center items-center bg-black w-screen">
            <p class="title">WOOD PECKER Season 19'</p>
        </div>
        <itemlist class="list2"/>
    </div>
</template>

<script>
import navbar from '../components/navbar'
import itemlist from '../components/itemList'
export default {
  data: function () {
    return {

    }
  },
  components: {
    itemlist
  },
  created(){
      window.scrollTo(0, 0)
      this.$store.dispatch('fetchAllImages')
  }
}
</script>

<style scoped>
    .list2 {
         width:85vw;
        margin-top: 20vh;
        margin-bottom: 10vh;
        margin-left: auto;
        margin-right: auto;
    }
    .bg-black{
        opacity: 0.9;
    }
    .background{
        height: 92vh;
    }
    .title{
        font-size: 3rem;
        color: white;
    }
</style>
