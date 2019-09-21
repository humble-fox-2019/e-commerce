<template>
  <div class="modal-mask flex items-center justify-center">
    <a href="" class="close-modal" @click.prevent="closeModal"></a>
    <div class="modal-container flex bg-black focus:outline-none z-10">
      <!-- <a href="" class="close-modal" @focus="closeModal"></! -->
      <div class="w-1/2 h-full">
        <div class="w-full h-full">
          <img
            class="object-cover h-full w-full"
            src="@/assets/img/malvestida-magazine-u79wy47kvVs-unsplash.jpg"
            alt=""
          />
        </div>
      </div>
      <div class="w-1/2 h-full flex justify-center items-center bg-white">
        <div class="desc-container">
          <h2 class="mb-4 font-bold text-2xl">{{ product.name }}</h2>

          <div>
            <h2 class="mb-2 font-bold">Quantity</h2>
            <ul class="flex items-center justify-around w-20 border border-gray-500 mb-4">
              <li>
                <div class="focus:outline-none" @click="decQty">
                  <i class="fas fa-minus"></i>
                </div>
              </li>
              <li>{{ qty }}</li>
              <li>
                <div class="focus:outline-none" @click="incQty">
                  <i class="fas fa-plus"></i>
                </div>
              </li>
            </ul>
          </div>

          <div class="mb-4">
            <h2 class="font-bold">Description</h2>
            <div class="h-20">{{ product.description }}</div>
          </div>

          <button class="bg-black px-6 py-1 rounded text-white focus:outline-none" @click="buy">
            <i class="fas fa-shopping-bag"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myAxios from '@/configs/myAxios.js'
import errorHandler from '@/configs/errorHandler.js'

export default {
  name: 'productDetail',
  data() {
    return {
      product: {},
      qty: 0
    }
  },
  methods: {
    incQty() {
      if (this.qty < this.product.stock) this.qty++
    },
    decQty() {
      if (this.qty > 0) this.qty--
    },
    buy() {},
    closeModal() {
      this.$router.push('/products')
    },
    fetchSingleProduct() {
      console.log('masuk');
      myAxios
        .get(`/products/${this.$route.params.id}`)
        .then(({ data }) => {
          this.product = data.product
          this.isLoading = false
          // this.products = data.products
        })
        .catch(err => {
          this.isLoading = false
          this.errors = errorHandler(err)
        })
    }
  },
  mounted() {
    this.fetchSingleProduct()
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s ease;
  z-index: 2;
}

.close-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
}

.image-container {
  height: auto;
}

.modal-container {
  width: 80%;
  height: 80%;
  transition: all 0.3s ease;
}

.desc-container {
  width: 90%;
  height: 90%;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
