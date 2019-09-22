<template>
  <v-sheet height="100%" style="display:flex">
    <SideMenu />
    <v-container style="margin-left: 10px; margin-right:10px; margin-top: 40px">
      <router-view></router-view>
    </v-container>
  </v-sheet>
</template>

<script>
import SideMenu from "@/components/SideMenu";

export default {
  name: "backEnd",
  components: {
    SideMenu
  },
  data() {
    return {};
  }
};
</script>
