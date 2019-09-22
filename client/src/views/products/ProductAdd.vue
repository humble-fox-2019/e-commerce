<template>
  <v-card>
    <v-card-title>Add a new product</v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="name" label="Name"></v-text-field>

        <v-text-field v-model="author" label="Author"></v-text-field>

        <v-text-field v-model="price" label="Price"></v-text-field>

        <v-text-field v-model="description" label="Description"></v-text-field>

        <v-text-field v-model="stock" label="Stock"></v-text-field>

        <v-text-field v-model="category" label="Category"></v-text-field>

        <v-file-input label="Image"></v-file-input>

        <v-btn color="success" class="mr-4" @click="save()">Save</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      author: "",
      price: "",
      description: "",
      stock: "",
      category: ""
    };
  },
  methods: {
      save() {
          alert('asdas')
      }
  }
};
</script>

<style>
</style>