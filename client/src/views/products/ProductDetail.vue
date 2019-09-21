<template>
  <div class="product">
    <v-col>
      <v-card :color="color">
        <v-list-item three-line>
          <v-list-item-avatar size="300" height="500px" tile>
            <v-img :src="image" width="100%" height="100%"></v-img>
          </v-list-item-avatar>

          <v-list-item-content class="align-self-start">
            <v-list-item-title class="display-2" v-text="name"></v-list-item-title>

            <v-list-item-title class="headline">
              <v-chip class="ma-2" color="indigo" text-color="white">
                <v-avatar left>
                  <v-icon>mdi-account-circle</v-icon>
                </v-avatar>
                {{author}}
              </v-chip>
            </v-list-item-title>
  
            <p class="py-4 my-3 paragraf">
              {{description}}
            </p>

  
            <v-list-item-title class="subtitle-1 pt-5">Detail:</v-list-item-title>

            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td>Jumlah Halaman</td>
                    <td>216</td>
                  </tr>
                  <tr>
                    <td>Tanggal Terbit</td>
                    <td>3 Jul 2019</td>
                  </tr>
                  <tr>
                    <td>ISBN</td>
                    <td>9786230001642</td>
                  </tr>
                  <tr>
                    <td>Bahasa</td>
                    <td>Indonesia</td>
                  </tr>
                  <tr>
                    <td>Penerbit</td>
                    <td>Elex Media Komputindo</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <div class="py-5">
            <v-list-item-title class="d-flex justify-center"  >
              <v-btn color="primary" dark><v-icon left>mdi-cart</v-icon> Buy</v-btn>
            </v-list-item-title>
            </div>
            
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import axios from "@/apis/axios";

export default {
  name: "productDetail",
  data() {
    return {
      color: "#FFFFFF",
      image: "",
      author: "",
      name: "",
      artist: "",
      description: ""
    };
  },
  methods: {
    getDetailProduct() {
      axios
        .get("products/" + this.$route.params.id)
        .then(({ data }) => {
          this.image = data.image;
          this.name = data.name;
          this.author = data.author;
          this.description = data.description;

          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getDetailProduct();
  }
};
</script>

<style scoped>
.paragraf {
  line-height: 30px;
}

</style>