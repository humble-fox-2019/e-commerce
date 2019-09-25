<template>
  <div class="col-4 mt-4">
    <div class="card w-75">
      <!-- <div class="card-image">
          <img :src="product.image" :alt="product.name" />
      </div> -->
      <img :src="product.image" class="card-img-top" alt="product.name">
      <div class="card-body">
        <div class="name">
          <div class="name-content">
            <strong><p class="title is-4">{{product.name}}</p></strong>
            <b-button pill variant="success" v-if="product.stock > 0">Available</b-button>
            <b-button pill variant="danger" v-if="product.stock <= 0">Out of Stock</b-button>
            <!-- <b-tag v-if="product.stock > 0" type="is-success">Available</b-tag>
            <b-tag v-if="product.stock <= 0" type="is-danger">Out Of Stock</b-tag> -->
          </div>
        </div>
        <div class="columns is-multiline">
          <div class="column price">
            <br />
            <h2>{{ changeFormat(product.price) }}</h2><br>
          </div>
        </div>
        <div>
          <p class="card-text">{{product.description.substring(0, 50)}}...</p>
          <br />
        </div>
        <div>
          <b>
            <p class="card-text">Our Stock: {{product.stock}} pc(s)</p>
          </b>
        </div>
      </div>
      <router-view />
      <div class="card-footer">
        <router-link :to="'/detail/'+product._id">
          <b-button pill variant="info">Detail</b-button>
        </router-link>
        <!-- <router-view/> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "product",
  props: {
    product: Object
  },
  methods: {
    changeFormat(price) {
      return `Rp. ${Number(price).toLocaleString("id-IDR")},-`;
    }
  }
};
</script>

<style scoped>
.card-img-top{
    height: 200px
}
.card-body {
  text-align: start;
}
.price h2 {
  font-weight: 600;
  font-size: 1.25em;
}

.price h3 {
  font-weight: 600;
  font-size: 1em;
}
.card-footer {
  margin-top: 1em;
  display: flex;
  justify-content: center;
}
</style>
