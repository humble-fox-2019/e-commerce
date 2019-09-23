<template>
  <div class="mt-4 pb-5">
    <div class="container shadow pb-5">
      <h1 class="pt-4 pb-2">Your Cart</h1>
      <hr />
      <div v-if="this.$store.state.carts.length == 0" class="pt-4">
        <i>Empty Cart</i>
      </div>
      <div v-else>
        <div class="row pt-3" v-for="cart in this.$store.state.carts" :key="cart._id">
          <div class="col-12">
            <Cart :cart="cart"></Cart>
          </div>
        </div>
        <div style="display: flex; justify-content:flex-end; padding-right: 5%">
          <div style="text-align: left;">
            <div class="desc">Total : Rp {{ total }},-</div>
            <div style="display: flex; justify-content:flex-end">
              <button @click="checkout()">
                Checkout
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "../api/axios";
import Cart from "../components/Cart";
import Swal from "sweetalert2";
export default {
    name: "UserCart",
    data: function() {
        return {};
    },
    components: {
        Cart
    },
    methods: {
    convertToRupiah(num) {
        let angka = num;
        let rupiah = "";
        let angkarev = angka
        .toString()
        .split("")
        .reverse()
        .join("");
        for (let i = 0; i < angkarev.length; i++)
        if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
        return rupiah
        .split("", rupiah.length - 1)
        .reverse()
        .join("");
    },
    checkout() {
        Swal.fire({
            title: "Checkout?",
            text: "You won't be able to refund the product that you purchased!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        })
        .then(result => {
            if (result.value) {
                const token = localStorage.getItem("token");

                let product = []
                this.$store.state.carts.forEach(cart => {
                    product.push({
                      name : cart.productId.name,
                      quantity : cart.quantity,
                      price : cart.productId.price,
                      imageURL : cart.productId.imageURL
                    })
                });

                axiosInstance({
                  method:"POST",
                  url : "/transactions",
                  headers : {
                    token
                  },
                  data : {
                    product,
                    userId : this.$store.state.id,
                    status : "pending"
                  }
                })
                .then( response => {
                })
                .catch( err => {
                  return Swal.fire('Error' , 'er','error')
                })
                let carts = this.$store.state.carts;
                carts.forEach(cart => {
                    let productId = cart.productId._id;
                    axiosInstance({
                        method: "GET",
                        url: `/products/detail/${productId}`,
                        headers: { token }
                    })
                    .then(product => {
                        return axiosInstance({
                            method: "PATCH",
                            url: `/products/stock/${product.data._id}`,
                            headers: {
                                token
                            },
                            data: {
                                stock: product.data.stock - cart.quantity
                            }
                        });
                    })
                    .then(_ => {
                        return axiosInstance({
                            method: "DELETE",
                            url: `/products/cart/${cart._id}`,
                            headers: {
                                token
                            }
                        });
                    })
                    .then(deleted => {
                        this.$store.dispatch("fetchCarts");
                        this.$store.dispatch("fetchProduct");
                        Swal.fire(
                            "Checkout Success",
                            "Thankyou for purchasing...",
                            "success"
                        );
                        this.$router.push("/");
                    })
                    .catch(console.log);
                });
            }
        })
        .catch(console.log);
    }
    },
    computed: {
        total() {
            let carts = this.$store.state.carts;
            let total = 0;
            carts.forEach(cart => {
                let subtotal = cart.quantity * cart.productId.price;
                total += subtotal;
            });
            return this.convertToRupiah(total);
        }
    },
        created() {
            this.$store.dispatch("fetchCarts");
        }
    };
</script>
<style scoped>
button {
  margin-top: 20px;
  padding: 10px;
  border: none;
  outline: none;
  background-color: blanchedalmond;
}
button:hover {
  background-color: wheat;
}
.desc {
  font-size: 20px;
  font-weight: bold;
}
</style>