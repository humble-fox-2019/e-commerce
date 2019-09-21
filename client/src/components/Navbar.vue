<template>
  <div class="navbar">
    <ul class="click">
      <router-link to="/aboutus" tag="li">About Us</router-link>
      <router-link to="/products" tag="li">Products</router-link>
      <img src="../assets/fuji.svg" alt />
      <router-link to="/register" tag="li" v-if="!showButton">Register</router-link>
      <router-link to="/login" tag="li" v-if="!showButton">Log In</router-link>
      <li href v-if="showButton">
        <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn fab color="indigo" v-on="on" dark>{{cart.length}}
        <v-icon>mdi-basket</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>User Controls</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Content filtering</v-list-item-title>
              <v-list-item-subtitle>Set the content filtering level to restrict apps that can be downloaded</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Password</v-list-item-title>
              <v-list-item-subtitle>Require password for purchase or use password to restrict purchase</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list three-line subheader>
          <v-subheader>General</v-subheader>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="notifications"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Notifications</v-list-item-title>
              <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="sound"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sound</v-list-item-title>
              <v-list-item-subtitle>Auto-update apps at any time. Data charges may apply</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="widgets"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Auto-add widgets</v-list-item-title>
              <v-list-item-subtitle>Automatically add home screen widgets</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
      </li>
      <li href v-if="showButton" @click="logoutMe">Log Out</li>
    </ul>
     
  </div>
</template>

<script>
export default {
  props : ['token', 'buyItem'],
  name: "Nav",
  data() {
    return {
      showButton : false,
      toCart : {},
      cart : [],
      dialog : false
    };
  },
  methods: {
    logoutMe() {
      localStorage.clear()
      this.showButton = false
      this.$router.push({path : '/about'})
    },
    checkButton(){
      console.log('heiiii');
      console.log();
      if (this.token || localStorage.token){
        this.showButton = true
      }
      else {
        this.showButton = false
      }
    }
  },
  watch: {
    token() {
     this.showButton = true
    },
    buyItem(){
      if (this.buyItem){
        // this.toCart = this.buyItem
        this.cart.push(this.buyItem.data)
      }
    }
  },
  mounted() {
    if (localStorage.token) {
      this.showButton = true
    }
  }
};
</script>

<style scoped>
.theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: rgb(65, 151, 185);
}

.navbar {
  background: linear-gradient(rgb(178, 219, 243), white);
  height: 20vh;
  width: 100%;
  font-family: Arial;
}
li {
  color: rgb(14, 0, 10);
  text-decoration: none;
  list-style: none;
  font-weight: bolder;
  cursor: pointer;
}
.click {
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
img {
  margin-top: 2px;
  height: 16vh;
}
v-btn{
  color: pink
}

</style>
