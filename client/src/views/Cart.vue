<template>
  <div class="cart">
      <h2 class="subheading grey--text">Cart</h2>
      <v-row>
        <v-col cols="12" sm="12">
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
              <tr v-for="item in products" :key="item.name">
                <td>{{ item.name }}</td>
                <td class="text-right">{{ item.qty }}</td>
                <td class="text-right">{{ item.subtotal }}</td>
                <td class="text-center">
                  BTN
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colspan=2 class="text-right">TOTAL</th>
                <th class="text-right">99900000</th>
                <th></th>
              </tr>
            </tfoot>
          </v-simple-table>
        </v-col>
      </v-row>
  </div>
</template>

<script>
export default {
  name: "cart",
  data() {
    return {
      products: [
        {
          name: 'Frozen Yogurt',
          qty: 159,
          subtotal: 400000
        },
        {
          name: 'Ice cream sandwich',
          qty: 237,
          subtotal: 550000
        },
        {
          name: 'Eclair',
          qty: 262,
          subtotal: 602000
        },
        {
          name: 'Cupcake',
          qty: 305,
          subtotal: 203000
        },
        {
          name: 'Gingerbread',
          qty: 356,
          subtotal: 330000
        }
      ]
    }
  },
  created() {
    if(!this.$store.state.token) {
      this.$router.push('/login');
    }
  }
};
</script>

<style>
</style>