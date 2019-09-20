<template>
  <v-parallax
    dark
    src="https://makingmusicmag.com/wp-content/uploads/2018/10/bass-guitar-1841186_1280.jpg"
    height="700"
  >
    <v-row align="center" justify="end">
      <h1 class="display-4 mr-12 glow">Bass-Line</h1>
    </v-row>
    <v-row align="center" justify="end">
      <h4 :elevation="10" class="display-3 mr-12 text-right glow">
        FULLFILL YOUR DREAMS
        <br />SLAPP THE BASS
      </h4>
    </v-row>
    <v-row align="center" justify="end">
      <div class="mr-12">
        <v-btn color="yellow lighten-3" outlined x-large dark>
          <router-link class="white--text" to="/shop">Shop Now</router-link>
        </v-btn>
      </div>
    </v-row>
  </v-parallax>
</template>

<script>
export default {};
</script>

<style scoped>
.glow {
  text-shadow: 0px 0px 5px #f1a800 !important;
}
</style>