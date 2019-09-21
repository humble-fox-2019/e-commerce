<template>
<div class="scope">
    <h1>
  {{category.title}}
    </h1>
  <div class="box" :style="{background: category.color}" >
  <Card v-for="(product , index) in products" :key="index" @toCart="toCart"></Card>
  </div>
</div> 
</template>

<script>
import Card from './Card.vue'

export default {
    props : ['category'],
  data() {
    return {
      products : [{
          name : 'lalalal'
      }, {name : 'lalalal'}, {name : 'lalalal'} ,{name : 'lalalal'}, {name : 'lalalal'},
       {name : 'lalalal'}, {name : 'lalalal'}]
    }
  },
  components : {
    Card
  },
  methods : {
    toCart(input){
      this.$emit('toCart', input)
    }
  }
}
</script>

<style scoped>
.box{
  padding: 8px;
  display: flex;
  overflow: scroll;
  overflow-x:auto;
  position: relative;
  border-radius: 10px;
  margin : 0 auto;
}
.scope{
    margin-top: 3%
}

.box::-webkit-scrollbar {
    -webkit-appearance: none;
}

.box::-webkit-scrollbar:vertical {
      width: 0px;
}

.box::-webkit-scrollbar:horizontal {
    height: 18px;

}

.box::-webkit-scrollbar-thumb {
    border-radius: 8px;
    border: 2px solid white;
    background-color: rgba(0, 0, 0, .3);
}


</style>