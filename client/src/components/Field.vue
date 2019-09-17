<template>
  <div class="input-group">
    <label for="">{{name}}</label>
    <input :type="type" :placeholder="`Your ${name} here...`">
  </div>
</template>

<script>
export default {
  name: 'Field',
  props: ['name', 'type']
}
</script>

<style scopedz>

.input-group > *{
  display: block;
}
.input-group{
  margin-bottom: 20px;
}
.input-group label{
  margin-bottom: 10px;
}
.input-group input{
  padding: 15px 20px;
  width: 300px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 2px rgba(0,0,0,.2);
  font-size: 12pt;
}


</style>
