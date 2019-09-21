<template>
  <v-app class="grey lighten-4">
    <Navbar />
    <v-content>
      <v-container class="my-5">
        <router-view></router-view>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {
  name: "frontEnd",
  components: {
    Navbar,
    Footer
  },
  data: () => ({
    //
  })
};
</script>
