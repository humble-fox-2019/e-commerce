<template>
  <div class="signin">
    <form>
      <h1>Signin</h1>
      <div>
        <Field name="email" type="text"></Field>
        <Field name="password" type="text"></Field>
        <BtnSubmit></BtnSubmit>
      </div>
    </form>
  </div>
</template>

<script>
import Field from '../components/Field.vue'
import BtnSubmit from '../components/BtnSubmit.vue'
export default {
  name: 'Signin',
  components: {
    Field,
    BtnSubmit
  }
}
</script>

<style scoped>
.signin{
  max-width: 1100px;
  padding: 20px;
  margin: 50px auto;
}
.signin h1{
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0,0,0,.1);
}
</style>
