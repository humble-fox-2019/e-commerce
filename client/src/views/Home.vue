<template>
  <div class="home">
    <v-container class="my-5">
      <h2 class="subheading grey--text">Novel</h2>
      <v-row>
        <v-col v-for="n in 10" :key="n" cols="12" sm="2">
          <v-card
            class="mx-auto"
            :flat="flat"
            :loading="loading"
            :outlined="outlined"
            :elevation="elevation"
            :raised="raised"
            :width="width"
            :height="height"
          >
            <v-img
              v-if="media"
              class="white--text"
              height="300px"
              src="https://cdn.gramedia.com/uploads/items/9786020459295_CR_First-Time-for-Everything__w200_hauto.jpg"
            >
            </v-img>

            <v-card-text>Firt time for everything</v-card-text>
            <v-card-actions v-if="actions">
              <v-btn icon>
                <v-icon class="red--text">mdi-heart</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn outlined>Buy</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
      flat: false,
      media: true,
      loading: false,
      actions: true,
      outlined: false,
      elevation: undefined,
      raised: false,
      width: 344,
      height: undefined,
    })
};
</script>

<style>
 .v-input__slider {
    width: 100%;
  }
</style>