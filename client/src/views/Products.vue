<template>
<div class="category">
  <Category v-for="(category, index) in categories" :key="index" :category="category" @toCart="toCart"></Category>
</div>

</template>

<script>
import Category from '../components/Category.vue'
export default {
  data () {
    return {
      categories: [
        { title: 'Snack', color: '#C0B0FF' },
        { title: 'Accesories', color: '#b678c9' },
        { title: 'Medicine', color: '#94B7E0' },
        { title: 'Action Figure', color: '#8D9CD6' }
      ]
    }
  },
  methods: {
    toCart (input) {
      this.$emit('toCart', input)
    }
  },
  components: {
    Category
  },
  created () {
  }
}
</script>

<style>
.category{
  width: 80vw;
  margin: 0 auto;
  padding: 15px
}
</style>
