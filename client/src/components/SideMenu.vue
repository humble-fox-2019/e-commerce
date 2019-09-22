<template>
  <v-navigation-drawer v-model="drawer" permanent>
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-title>John Leider</v-list-item-title>
    </v-list-item>
  <v-list-item>
    <v-btn text color="primary" to="/">
      view site
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
</template>

<script>
export default {
    name: 'SideMenu',
    data() {
      return {
        drawer: true
      }
    }
}
</script>

<style>

</style>