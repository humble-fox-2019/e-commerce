<template>
  <div>
    <!-- <div class="row d-flex justify-content-center" style="margin : 0;">
      <div
        v-for="product in products"
        :key="product._id"
        class="card col-xl-2 col-lg-3 col-md-6 col-sm-12 m-5"
        style="width: 400px; padding: 0; height : 375px;"
        @click="detailProduct(product._id)"
      >
        <img class="card-img-top" style="width : 100%; height : 200px;" :src="product.image" alt="Card image cap" />
        <div class="card-body pt-4" style="background-color : whitesmoke;">
          <h5 class="card-title">Product Name : {{product.name}}</h5>
          <h5 class="card-title">Price : {{product.price}}</h5>
          <div>
            <b-button v-b-modal.modal-1 >Add To Cart</b-button>

            <b-modal id="modal-1" title="BootstrapVue" @ok="tess">
                <p class="my-4">Are You Sure Want to add {{product.name}} to Your Cart</p>
            </b-modal>
          </div>
        </div>
      </div>
    </div> -->
    <div class="container outside-content">
        <p class="title-title-1">Our Product</p>
        <div class="row">
            <div class="content-1 col-xl-4 col-lg-4 col-md-3 col-sm-12"
            v-for="product in products"
            :key="product._id"
            @click="detailProduct(product._id)"
            >
                    <div class="content-image">
                        <img :src="product.image" alt="">
                    </div>
                    <div class="content-des">
                        <div class="title-content">
                            {{product.name}}
                        </div>
                        <div class="price-content">
                            Rp. {{product.price}}
                        </div>
                        <div class="luar-button">
                            <button class="button-content">Add To Cart</button>
                        </div>
                    </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// import axios from "../apis/axiosServer";
import axios from 'axios'
export default {
  data() {
    return {
      products: []
    };
  },
  created() {
    if (!localStorage.getItem("token")) {
      this.$router.push({ path: "/login" });
    }
    this.loading()
    axios
      .get("http://localhost:3000/product",{
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        console.log(data);
        this.products = data;
      })
      .catch(err => {
        console.log(err);
        console.log(err);
      });
  },
  methods : {
    tess (){
      console.log('hahahahahahahahahaha')
    },
    detailProduct (id){
      console.log(id)
      this.$router.push({ path : `/detail/${id}` })
      console.log('ahahhaahh', id)
    },
    loading (){
      let timerInterval
     this.$swal.fire({
      title: 'Be Patient',
      html: 'Loading....',
      timer: 1000,
      onBeforeOpen: () => {
          this.$swal.showLoading()
          timerInterval = setInterval(() => {
          this.$swal.getContent().querySelector('strong')
              .textContent = this.$swal.getTimerLeft()
          }, 100)
      },
      onClose: () => {
          clearInterval(timerInterval)
      }
      }).then((result) => {
      if (
          /* Read more about handling dismissals below */
          result.dismiss === this.$swal.DismissReason.timer
      ) {
          console.log('I was closed by the timer')
      }
      })
    }
  }
};
</script>

<style scoped>
  .title-title-1 {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 26px;
    font-weight: 50rem;
    margin-bottom: 80px;    
  }
  .outside-content {
    margin-top: 50px;
}
.content-1 { 
    margin-bottom: 20px;
    height: 500px;
    cursor: pointer;
}

.content-image{
    width: 90%;
    color: #262b27;
    height: 60%;
}

.content-image img{
    height: 100%;
    width: 100%;
}

.content-des {
    width: 90%;
    height: 40%;
}

.title-content {
    font-size: 26px;
    font-weight: 70px;
    text-align: center;
    font-family: 'Nunito Sans', sans-serif;
    color: #262b27;
}

.price-content {
    color: #34eb4c;
    font-size: 26px;
    font-weight: 70px;
    text-align: center;
    font-family: 'Nunito Sans', sans-serif;
}

.luar-button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
}

.button-content {
    width: 150px;
    height: 50px;
    background-color: #2aeaf5;
    border: none;
    color: white;
    font-size: 20px;
    font-weight: 20px;
    text-align: center;
    font-family: 'Nunito Sans', sans-serif;
}
</style>