<template>
  <div class="product">
    <div class="product-image" :style="`background-image: url(${product.image})`">
    </div>
    <div class="text">
      <h2>{{ product.name }}</h2>
      <div class="text-footer">
        <h3>{{ formatPrice(product.price) }}</h3>
        <button @click="$router.push(`/product/${product._id}`)">Detail</button>
      </div>
      <div class="store-info">
        <h3>{{ product.store.name }}</h3>
        <p><i class="fas fa-map-marker-alt"></i> {{ product.store.city }}, {{ product.store.province }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProducItem',
  props: ['product'],
  methods: {
    formatPrice(price) {
      if(!price) {
        return 0
      }else{
        price = price.toString()
        let newPrice = ''
        let index = 0
        for(let i=price.length-1;i>=0;i--) {
          if(index % 3 == 0 && index != 0) {
            newPrice = '.' + newPrice
          }
          index++
          newPrice = price[i] + newPrice
        }
        return 'Rp. ' + newPrice
      }
    }
  }
}
</script>

<style scoped>
.product{
  flex-basis: 22%;
  flex-grow: 1;
  max-width: 250px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,.2);
  margin: 10px;
  display: flex;
  flex-direction: column;
  background-color: #e9e9e9;
}
.product .text{
  padding: 20px 10px 10px 10px;
  background-color: #ffffff;
  border-radius: 20px 20px 0 0;
  margin-top: -20px;
  flex-grow: 1;
}
.product-image {
  margin: auto;
  width: 100%;
  height: 180px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.text h2{
  font-size: 14pt;
  font-weight: normal;
  margin: 10px 0;
  height: 60px;
}
.text-footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text-footer h3{
  color: #43ca34;
  font-size: 13pt;
}
.text-footer button{
  background-color: #43ca34;
  color: #ffffff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  font-size: 8pt;
  font-weight: bold;
  cursor: pointer;
}
.store-info{
  padding-top: 10px;
  margin-top: 10px;
  border-top: 1px solid #cfcfcf;
}
.store-info h3{
  font-size: 10pt;
}
.store-info p{
  font-size: 10pt;
}
.store-info i{
  color: #43ca34;
}
</style>