<template>
  <div class="cart">
    <h2 class="subheading grey--text">Cart</h2>
    <v-row>
      <v-col cols="12" sm="12">
        <v-card>
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">Product</th>
                <th class="text-center">Qty</th>
                <th class="text-center">Subtotal</th>
                <th class="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td class="body-1">{{ product.name }}</td>
                <td class="text-center">
                  <v-btn fab dark text color="warning" x-small>
                    <v-icon dark @click="minusProduct(product.id)">mdi-minus</v-icon>
                  </v-btn>
                  <span class="px-4 body-1">{{ product.qty }}</span>
                  <v-btn fab dark text color="indigo" x-small>
                    <v-icon dark @click="plusProduct(product.id)">mdi-plus</v-icon>
                  </v-btn>
                </td>
                <td class="text-right" style="body-1">{{ product.subtotal }}</td>
                <td class="text-center">
                  <v-btn text icon color="pink" @click="removeProduct(product.id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class>
                <th colspan="2" class="subtitle-1 text-right">TOTAL</th>
                <th class="subtitle-1 text-right">{{numberFormat(total)}}</th>
                <th></th>
              </tr>
            </tfoot>
          </v-simple-table>

          <v-card-text>
            Addres:
            <v-textarea v-model="address"></v-textarea>
          </v-card-text>

          <v-card-actions>
            <div class="flex-grow-1"></div>            
            <v-btn dark color="teal" @click="checkout()">
              <v-icon>mdi-check</v-icon>Checkout
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import db from "@/apis/axios";
import Swal from "sweetalert2";

export default {
  name: "cart",
  data() {
    return {
      products: [],
      total: 0,
      address: ""
    };
  },
  methods: {
    getCart() {
      db.get("/cart", {
        headers: {
          access_token: this.$store.state.token
        }
      })
        .then(({ data }) => {
          let tmpProducts = [];
          data.forEach(el => {
            tmpProducts.push({
              id: el._id,
              productid: el.productid._id,
              name: el.productid.name,
              qty: el.qty,
              price: el.productid.price,
              stock: el.productid.stock,
              subtotal: this.numberFormat(el.qty * el.productid.price)
            });

            this.total += el.qty * el.productid.price;
          });

          this.products = tmpProducts;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});
    },
    numberFormat(num) {
      return numeral(num).format("0,0");
    },
    updateProduct(id, qty) {
      db.put(
        "/cart/" + id,
        {
          qty
        },
        {
          headers: {
            access_token: this.$store.state.token
          }
        }
      )
        .then(({ data }) => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});
    },
    plusProduct(id) {
      let getIndex = this.products
        .map(function(el) {
          return el.id;
        })
        .indexOf(id);

      if (this.products[getIndex].qty === this.products[getIndex].stock) {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: "Stock not enough"
        });
      } else {
        this.products[getIndex].qty += 1;

        this.updateProduct(id, this.products[getIndex].qty);
      }
    },
    minusProduct(id) {
      let getIndex = this.products
        .map(function(el) {
          return el.id;
        })
        .indexOf(id);
      if (this.products[getIndex].qty === 1) {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: "Minimum 1"
        });
      } else {
        this.products[getIndex].qty -= 1;

        this.updateProduct(id, this.products[getIndex].qty);
      }
    },
    removeProduct(id) {
      db.delete("/cart/" + id, {
        headers: {
          access_token: this.$store.state.token
        }
      })
        .then(({ data }) => {
          this.getCart();
        })
        .catch(err => {
          let errMsg;
          
          if (err.response.data) {
            errMsg = err.response.data.message.join("\n");
          } else {
            errMsg = "something wrong"
          }
          
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: errMsg
          });
        })
        .finally(() => {});
    },
    checkout() {
      db.post(
        "/cart/checkout/",{ address: this.address},
        {
          headers: {
            access_token: this.$store.state.token
          }
        }
      ).then(({ data }) => {
          Swal.fire({
            type: "success",
            title: "Success",
            text: "Checkout done!"
          });
          
          this.getCart();          
        })
        .catch(err => {
          let errMsg;
          
          if (err.response.data) {
            errMsg = err.response.data.message.join("\n");
          } else {
            errMsg = "something wrong"
          }
          
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: errMsg
          });
        });
    }
  },
  watch: {
    products: {
      handler: function(newValue) {
        let tmpTotal = 0;
        this.products.forEach(el => {
          console.log(el.price);
          el.subtotal = this.numberFormat(el.qty * el.price);
          tmpTotal += el.qty * el.price;
        });

        this.total = tmpTotal;
      },
      deep: true
    }
  },
  created() {
    if (!this.$store.state.token) {
      this.$router.push("/login");
    }
    this.address = "";
    this.getCart();
  }
};
</script>

<style>
</style>