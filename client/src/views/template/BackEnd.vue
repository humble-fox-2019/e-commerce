<template>
  <v-sheet height="100%" class="overflow-hidden" style="position: relative;">
    <v-container>
      <v-row align="center" justify="center">
        <v-btn color="pink" dark @click.stop="drawer = !drawer">Toggle</v-btn>
      </v-row>
    <v-navigation-drawer absolute v-model="drawer" permanent>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>John Leider</v-list-item-title>

        <v-btn icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item link to="/products">
          <v-list-item-icon>
            <v-icon>mdi-format-list-bulleted</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Products</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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
