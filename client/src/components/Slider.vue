<template>
  <div class="slider">
    <div class="control">
      <div></div>
      <div></div>
    </div>
    <div>
      <img src="../assets/gaming.png" alt="" srcset="">
      <div class="text">
        <h1>Gaming</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
        <button>Shop now</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.slider{
  max-width: 1100px;
  margin: 60px auto;
  padding: 20px;
}

.slider img{
  width: 100%;
}

.slider > div{
  position: relative;
}
.slider > div .text{
  position: absolute;
  top: 50%;
  left: 40px;
  transform: translateY(-50%);
  max-width: 600px;
}
.slider > div .text h1{
  color: #ffffff;
  font-size: 32pt;
}
.slider > div .text p{
  color: #ffffff;
  margin: 30px 0;
  line-height: 1.5em;
}
.slider > div .text button{
  border: none;
  padding: 10px 40px;
  font-size: 10pt;
  color: #43ca34;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(11,71,5,.2);
  cursor: pointer;
}

</style>
