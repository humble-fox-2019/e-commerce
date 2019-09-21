<template>
    <div>
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
      this.$store.dispatch('fetchImage', { brand: 'New Balance' })
  }
}
</script>

<style scoped>
    .list2 {
 width:85vw;
        margin-top: 60px;
        margin-left: auto;
        margin-right: auto;
    }
</style>
