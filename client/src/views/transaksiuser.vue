<template>
  <div style="padding-top : 100px;" class="container d-flex justify-content-center">
    <div class="col-xl-12 col-lg-12 col-md-10 col-sm-6">
      <table class="table">
      <thead class="thead trx-head">
        <tr>
          <th scope="col">Status</th>
          <th scope="col">alamat</th>
          <th scope="col">Total Item</th>
          <th scope="col">Total Harga</th>
          <th scope="col">Action</th>
          <th scope="col">Detail</th>
        </tr>
      </thead>
      <tbody style="background-color : white; ">
        <tr v-for="trx in trxList" :key="trx._id">
          <td v-if="trx.status == 'first'">Sabar dulu ya!!</td>
          <td v-else-if="trx.status =='second'">Barang sedang di Kirim</td>
          <td v-else-if="trx.status === 'third'">Barang Sudah sampai , Terima Kasih</td>
          <td>{{trx.alamat}}</td>
          <td>{{trx.ProductList.length}}</td>
          <td>{{trx.totalHarga}}</td>
          <td v-if="trx.status == 'second'">
            <input
              type="button"
              @click="konfirmasiPembayaran(trx._id)"
              value="confirm item has arrived"
              class="my-button "
            />
          </td>
          <td v-else-if="trx.status == 'third' ">
            Barang Sudah Terkirim
          </td>
          <td v-else>
            <p>Menunggu Admin</p>
          </td>
          <td>
            <input type="button" class="btn btn-primary" value="detail" @click="detailtrx(trx._id)">
          </td>
        </tr>
      </tbody>
    </table>
    <router-view v-bind:data="data" />
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
    created (){
        axios({
        url: `http://34.87.84.241/transaction/user`,
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
    .then(({ data }) => {
        this.trxList = data
        console.log(data , ' INI HASILNYA ==========----=-=-=-=-222244')
    })
    .catch(err => {
        console.log(err);
    });
    },
    data() {
    return {
      trxList: [],
      ProductList : [],
      data : {}
    };
  },
  methods : {
    konfirmasiPembayaran (id){
      axios({
        url: `http://34.87.84.241/transaction/${id}/user`,
        method: "PATCH",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
            console.log(data)
            this.trxList.forEach(el=>{
                if(el._id == id){
                    el.status = 'third';
                }
            })
        })
        .catch(err => {
            console.log(err);
        });
    },
    detailtrx (id) {
      
       axios({
      url: `http://34.87.84.241/transaction/${id}/detail`,
      method: "GET",
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(data => {
        this.$router.push({ path : `/transaksiuser/detail/${id}` })
        // this.trxList = data;
        // console.log(this.$router.params , ' ppopopopo=0 mkmkm gggg-----gg-g-')
        this.productList = data.data.ProductList;
        this.data = data.data.ProductList
        // console.log(data  , ' =-----------------------------0===============')
        // console.log(data.data.ProductList, " masa null sih");
      })
      .catch(err => {
        console.log(err);
      });
      console.log(id)
        
    }
  }
}
</script>

<style scoped>
  .trx-head {
    background-color: rgb(211, 153, 44);
    color: white;
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 190px;
    font-size: 18px;
  }
  * {
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 200px;
    font-size: 17px;
  }
  .my-button {
    background-color: rgb(211, 153, 44) !important;
    border: none;
    color: white;
    border-radius: 0.3rem;
    font-weight: 200px;
    font-size: 17px;
    height: 30px;
  }
</style>