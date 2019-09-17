<template>
  <div>
    <div class="cont">
      <div class="container">
        <LoginForm @changeLoginStatus='changeLoginStatus'></LoginForm>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
export default {
  name: "Login",
  components: {
    LoginForm
  },
  methods :{
    changeLoginStatus ( status ) {
      this.$emit('changeLoginStatus' , status );
    }
  },
  created : function () {
    this.$emit('reset')
  }
};
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