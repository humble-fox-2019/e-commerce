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
                  <v-btn text icon color="pink">
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

          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn dark color="teal">
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

export default {
  name: "cart",
  data() {
    return {
      products: [],
      total: 0
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
          data.forEach(el => {
            this.products.push({
              id: el._id,
              productid: el.productid._id,
              name: el.productid.name,
              qty: el.qty,
              subtotal: this.numberFormat(el.qty * el.productid.price)
            });

            this.total += el.qty * el.productid.price;
          });
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});
    },
    numberFormat(num) {
      return numeral(num).format("0,0");
    },
    updateProduct(id, qty){
      db.put("/cart/"+id, {
        qty
      }, {
        headers: {
          access_token: this.$store.state.token
        }
      })
      .then(({ data }) => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});
    },
    plusProduct(id){
      let getIndex = this.products.map(function(el) { return el.id; }).indexOf(id);
      
      this.products[getIndex].qty += 1;
      
      this.updateProduct(id, this.products[getIndex].qty)
    },
    minusProduct(id){
      let getIndex = this.products.map(function(el) { return el.id; }).indexOf(id);
      
      this.products[getIndex].qty -= 1;
      
      this.updateProduct(id, this.products[getIndex].qty)
    }
  },
  created() {
    if (!this.$store.state.token) {
      this.$router.push("/login");
    }

    this.getCart();
  }
};
</script>

<style>
</style>