<template>
  <div class="user-order">
    <h1>My order history</h1>

  </div>
</template>

<script>

import axios from '../api/server'

export default {
  name: 'UserOrder',
  data() {
    return {

    }
  },
  created() {
    axios.get('/transaction', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      console.log('hahahh')
      console.log(data)
    })
    .catch(err => {
      console.log(err.response.data)
      this.$router.push('/')
    })
  }
}
</script>

<style scoped>

.user-order h1{
  color: #43ca34;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e9e9e9;
}

</style>
