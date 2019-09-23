<template>
  <div style="padding-top : 100px;" class="container">
    <div class="container">
      <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <table class="table">
          <thead class="thead head-admin-table">
            <tr>
              <th scope="col">Buyer</th>
              <th scope="col">Status</th>
              <th scope="col">alamat</th>
              <th scope="col">Total Item</th>
              <th scope="col">Total Harga</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody class="body-admin-table">
            <tr v-for="trx in trxList" :key="trx._id">
              <td>{{trx.User.username}}</td>
              <td v-if="trx.status == 'first'">Menunggu Konfirmasi Anda</td>
              <td v-else-if="trx.status =='second'">Barang sedang Terkirim</td>
              <td v-else-if="trx.status === 'third'">Barang Sudah sampai</td>
              <td>{{trx.alamat}}</td>
              <td>{{trx.ProductList.length}}</td>
              <td>{{trx.totalHarga}}</td>
              <td v-if="trx.status == 'first'">
                <input
                  type="button"
                  @click="konfirmasiPembayaran(trx._id)"
                  value="konfirmasi"
                  class="btn btn-primary"
                />
              </td>
              <td v-else  >
                  <!-- <input
                  type="button"
                  @click="konfirmasiPembayaran(trx._id)"
                  value="konfirmasi"
                  class="btn btn-danger"
                  disabled
                /> -->
                Sudah Di konfirmasi
              </td>
            </tr>
          </tbody>
        </table>
      </div> 

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    if (!localStorage.getItem("admin")) {
      this.$router.push({ path: "/" });
    }
    axios({
      url: "http://34.87.84.241/transaction",
      method: "GET",
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(({ data }) => {
        this.trxList = data;
        console.log(data[0].status, " =================");
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      trxList: []
    };
  },
  methods: {
    konfirmasiPembayaran(id) {
      axios({
        url: `http://34.87.84.241/transaction/${id}/admin`,
        method: "PATCH",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
            console.log(data)
            this.trxList.forEach(el=>{
                if(el._id == id){
                    el.status = 'second'
                }
            })
        })
        .catch(err => {
            console.log(err);
        });
    }
  }
};
</script>

<style scoped>
  .head-admin-table {
    background-color: rgb(211, 153, 44) !important;
    color: white;
  }
</style>