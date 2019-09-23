<template>
  <div>
      <div class="cont">
          <div class="container">
            <RegisterForm></RegisterForm>
          </div>
      </div>
  </div>
</template>

<script>
import RegisterForm from '../components/RegisterForm'
export default {
    components : {
        RegisterForm
    }
}
</script>

<style scoped>
    .cont {
        height : 700px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>