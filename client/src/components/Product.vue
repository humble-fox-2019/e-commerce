<template>
  <div class="product">
    <img src="https://storage.cloud.google.com/image-ecommerce-josprima-site/samplelaptop.png" alt="" srcset="">
    <div class="text">
      <h2>Microsoft surface laptop A2345a</h2>
      <div class="text-footer">
        <h3>Rp. 27.000.000</h3>
        <button>Detail</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.product{
  flex-basis: 30%;
  background-color: rgb(241, 241, 241);
  border-radius: 5px;
  box-shadow: 0 2px 2px rgba(0,0,0,.2);
}
.product .text{
  padding: 30px 20px 20px 20px;
  background-color: #ffffff;
  border-radius: 20px 20px 0 0;
  margin-top: 20px;
}
.product img{
  width: 80%;
  display: block;
  margin: auto;
  padding-top: 40px;
}
.text h2{
  font-size: 14pt;
  font-weight: normal;
  margin: 30px 0;
}
.text-footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text-footer h3{
  color: #43ca34;
}
.text-footer button{
  background-color: #43ca34;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 10pt;
  font-weight: bold;
  cursor: pointer;
}
</style>