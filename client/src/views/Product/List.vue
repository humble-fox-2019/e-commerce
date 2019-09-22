<template>
  <div id="product-list">
    <div v-if="isAdmin" class="row mt-5">
      <div class="col-md-12 d-flex justify-content-center">
        <button @click="$router.push('/home/add')" class="btn btn-warning" style="width:100%">
          Add Product
          <i class="fa fa-plus ml-2"></i>
        </button>
      </div>
    </div>
    <div class="row mt-5">
      <div v-for="product in products" :key="product._id" class="col-md-3">
        <div class="card">
          <img :src="product.image" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="text-warning">Rp. {{ product.price }}</p>
            <p class="card-text text-justify">{{ product.des }}</p>
            <button class="btn btn-primary" style="width:100%">
              Add to cart
              <i class="fa fa-plus ml-2"></i>
            </button>
            <div v-if="isAdmin">
              <hr />
              <button @click="deleteProduct(product._id)" class="btn btn-danger" style="width:100%">
                Delete Product
                <i class="fa fa-trash ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "product-list",
  computed: {
    ...mapState(["isAdmin", "products"])
  },
  created() {
    this.fetchProduct();
  },
  methods: {
    ...mapMutations(["initProduct"]),
    fetchProduct() {
      this.axios({
        url: "/product",
        method: "get",
        baseURL: this.baseURL
      })
        .then(response => {
          const { data } = response;
          this.initProduct({
            data
          });
        })
        .catch(err => {
          this.Swal.fire({
            type: err.response.data.type,
            text: err.response.data.message
          });
        });
    },
    deleteProduct(id) {
      this.Swal.fire({
        text: "Permanent delete.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Delete"
      })
        .then(result => {
          if (result.value) {
            this.Swal.fire({
              title: "Deleting product",
              allowOutsideClick: () => !Swal.isLoading()
            });
            this.Swal.showLoading();
            return this.axios({
              url: `/product/delete/${id}`,
              method: "delete",
              baseURL: this.baseURL
            });
          }
        })
        .then(() => {
          this.fetchProduct()
          this.Swal.close();
          this.Swal.fire("Deleted!", "Your file has been deleted.", "success");
        })
        .catch(err => {
          this.Swal.close();
          this.Swal.fire({
            type: err.response.data.type,
            text: err.response.data.message
          });
        });
    }
  }
};
</script>

<style>
</style>