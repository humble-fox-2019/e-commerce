<template>
<div class="scope">
    <h1>
  {{category.title}}
    </h1>
  <div class="box" :style="{background: category.color, border:`5pt solid ${category.color}`}" >
  <Card v-for="(product , index) in products" :key="index" @toCart="toCart" :product='product'></Card>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import Card from './Card.vue'
const baseUrl = 'http://localhost:3000'

export default {
  props: ['category'],
  data () {
    return {
      products: []
    }
  },
  components: {
    Card
  },
  methods: {
    toCart (input) {
      this.$emit('toCart', input)
    }
  },
  created () {
    axios({
      method: 'post',
      url: baseUrl + '/products/category',
      data: {
        category: this.category.title
      }
    })
      .then(response => {
      // console.log(response.data);
        this.products = response.data.data
      })
      .catch(err => {
        console.log(err.response)
      })
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
