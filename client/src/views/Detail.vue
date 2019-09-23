<template>
  <div class="detail-content-1">
    <div class="image-detail-22">
      <img :src="this.image" alt="">
    </div>
    <div class="product-detail-33">
      <div class="detail-name-product mt-5">
        <p>{{name}}</p>
        <h6 class="mt-5">Rp. {{price}}</h6>
        <h6 class="mt-2 mb-5">Stock {{stock}}</h6>
      </div>
      <div class="check-out-content-66">
        <div class="add-qty-detail">
          <input type="button" value="-" class="button-minus" data-field="quantity" @click="qtyMin()" />
          <input type="number" step="1" max value="1" name="quantity" class="quantity-field" v-model="qty" />
          <input type="button" value="+" class="button-plus" data-field="quantity" @click="qtyPlus()" />
        </div>

        <div class="total-price-77">
          <p>Total</p>
          <p>Rp. {{qty * price}}</p>
        </div>
        
        <button class="button-detail-add" @click="addToCart">Add To Cart</button>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      image: "",
      name : '',
      price : 0,
      stock : '',
      qty : 1,
      id : ''
    };
  },
  created (){
      axios.get(`http://34.87.84.241/product/${this.$route.params.id}`,{
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then( ( {data})=>{
          let { image , name , price, stock , _id } = data
          this.image = image
          this.name = name
          this.stock = stock
          this.price = price
          this.id = _id
          console.log(data)
      })
      .catch(err=>{
          console.log(err)
      })
  },
  methods : {
      qtyPlus (){
         this.qty++
      },
      qtyMin (){
          this.qty--
          if(this.qty < 0){
              this.qty++
          }
      },
      addToCart (){
          axios({
              url : 'http://34.87.84.241/cart',
              method : 'POST',  
              headers : {
                  token : localStorage.getItem('token')
              },
              data : {
                  id : this.id,
                  qty : this.qty
              }
          })
          .then(data=>{
               this.$swal('Sukses Add To Cart','Click','success');
                console.log(data)
                this.stock -= this.qty
          })
          .catch(err=>{
            //   console.log(err.data , ' == = = = = = ')
            this.$swal('Stok Tidak Cukup','Click','warning');
          })
      }
  }
};
</script>

<style scoped>


  

  @media only screen and (max-width: 600px) {
    .image-detail-22  img {
      height: 100%;
      width: 100%;
    }
  }

  @media only screen and (min-width: 600px) {
    .detail-content-1 {
      background-color: whitesmoke;
      height: 95vh;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .image-detail-22  img {
      height: 50%;
      width: 70%;
    }
    .image-detail-22 {
      background-color: #ffffff;
      height: 84%;
      width: 520px;
      margin-top: 50px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .product-detail-33 {
      /* background-color: #EEEEEE; */
      height: 84%;
      width: 520px;
      margin-top: 50px;
      margin-left: 50px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
    .detail-name-product p {
      font-size: 35px;
      font-family: 'Montserrat', sans-serif;
      font-weight: 700;
      color: rgb(211, 153, 44);
      text-align: center;
      text-indent: 0px;
      line-height: 36px;
    }
    .detail-name-product h6 {
      font-family: 'Montserrat', sans-serif;
      font-size: 20px;
      font-weight: 700;
      text-indent: 0px;
      line-height: 36px;
    }
    .button-detail-add {
      background-color: rgb(211, 153, 44);
      border: none;
      color: #ffffff;
      height: 50px;
      width: 250px;
      margin-top: 20px;
      font-family: 'Montserrat', sans-serif; 
      font-weight: 700;
      text-align: center;
    }
    .detail-main-content {
      margin: 0 auto;
      width: 100%;
      height: 100%;
    }
    /* .add-qty-detail {

    } */
    .check-out-content-66 {
      margin-top: 70px;
    }
    .total-price-77 {
      margin-top: 20px;
    }
    .total-price-77 p {
      font-family: 'Montserrat', sans-serif;
      font-size: 20px;
      font-weight: 700;
      text-indent: 0px;
      line-height: 36px;
    }
    .quantity-field {
      width: 54px;
      border: none;
      height: 30px;
      font-size: 18px;
      text-align: center;
      background-color: whitesmoke;
      border-bottom:  1px solid black;
    }
    .button-minus ,
    .button-plus {
      border: 2px solid #78C882;
      height: 33px;
      width: 30px;
      background-color: whitesmoke;
      border-radius: 2.0rem;
    }
  }



</style> 
