<template>
  <div>
    <h1>Tomoe Store</h1>
    <p>
      Tomoe Store is an online shop selling a japan product.
      <br />We named tomoe because we hope our busniess keep swirl time by time.
    </p>
    <p>
      A tomoe, commonly translated as "comma",
      <br />is a comma-like swirl symbol used in Japanese mon.
      <br />It closely resembles the usual form of a magatama.
      <br />
    </p>
    <v-app id="inspire" width="80%">
      <div class="carrousel">
        <v-container row wrap style>
          <v-carousel hide-delimiters>
            <v-carousel-item v-for="image in carouselImg" :src="image.imgsrc" :key="image.id"></v-carousel-item>
          </v-carousel>
        </v-container>
      </div>
    </v-app>
    <v-footer dark padless>
      <v-card class="flex" flat tile large>
        <v-card-actions class="grey darken-3 justify-center" height="10vh">
          {{ new Date().getFullYear() }} —
          <strong>Tomoe Store</strong>
        </v-card-actions>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      carouselImg: [
        {
          imgsrc:
            'https://media0.giphy.com/media/fGOmKU9YVPpuzRBKJJ/giphy.gif?cid=790b7611e4c35bc2af8643fd07ab8fc647a1203b50cb1f1b&rid=giphy.gif'
        },
        {
          imgsrc:
            'https://media1.giphy.com/media/WtVMI5xx3ZWiesgdW0/giphy.gif?cid=790b761134c0276a4a78f0aaea270d60e01115b33d4cadf7&rid=giphy.gif'
        },
        {
          imgsrc: 'https://media.giphy.com/media/xUOxfaABfkwPSJ5M6A/giphy.gif'
        }
      ]
    }
  }
}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Be+Vietnam|Muli|Roboto&display=swap");
.carrousel {
  width: 63vw;
  margin: 0 auto;
  margin-top: 35px;
}
h1 {
  margin-top: 160px;
  font-family: "Roboto", sans-serif;
  font-size: 32pt;
  margin-bottom: 8px;
}
p {
  font-family: "Muli", sans-serif;
  margin: 10px;
}
.v-card__actions {
  padding: 25px;
  background: teal;
  font-family: "Roboto", sans-serif;
  font-size: 18pt;
}
</style>
