<template>
  <div>
    <div class="head">
      <h1>Admin Access</h1>
      <div>
        <v-btn dark @click="toCreate">Add New Product</v-btn>
      </div>
    </div>
    <v-data-table :headers="headers" :items="products" class="elevation-1" :items-per-page="3">
      <template v-slot:item.image="{ item }">
        <img :src="item.image" alt srcset height="200px" />
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon class="mr-2">mdi-grease-pencil</v-icon>
        <v-icon @click="deleteItem(item)">mdi-delete-empty</v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
import axios from 'axios'
const baseUrl = 'http://localhost:3000'
export default {
  name: 'Admin',
  data () {
    return {
      products: [],
      headers: [
        { text: 'Image', value: 'image' },
        {
          text: 'Product Name',
          align: 'left',
          value: 'productName'
        },
        { text: 'Stock', value: 'stock' },
        { text: 'Category', value: 'category' },
        { text: 'Price', value: 'price' },
        { text: 'Description', value: 'description', width: '390px' },
        { text: 'Actions', value: 'action', sortable: false }
      ]
    }
  },
  components: {},
  methods: {
    getAll () {
      axios({
        method: 'get',
        url: baseUrl + '/products'
      })
        .then(response => {
          let products = []
          response.data.data.forEach((element, i) => {
            let obj = { ...element }
            obj.no = i + 1
            products.push(obj)
          })
          this.products = products
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteItem (input) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.value) {
          axios({
            method: 'delete',
            url: baseUrl + '/products/' + input._id,
            headers: {
              token: localStorage.token
            }
          }).then(data => {
            for (let i = 0; i < this.products.length; i++) {
              if (this.products[i]._id === input._id) {
                this.products.splice(i, 1)
              }
            }
            Swal.fire('Deleted!', 'Your product has been deleted.', 'success')
          })
        }
      })
    },
    toCreate () {
      this.$router.push({ path: '/admin/create' })
    }
  },
  created () {
    this.getAll()
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Be+Vietnam|Muli|Roboto&display=swap");
* {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}
.theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: purple;
}
.mdi-grease-pencil::before {
  content: "\F648";
  display: none;
}

.mdi-delete-empty::before {
  font-size: 26pt;
}

img {
  object-fit: contain;
  height: 100px;
  width: 100px;
}
th {
  font-size: 13pt;
}
v-icon:hover {
  cursor: pointer;
}
h1 {
  margin-bottom: 10px;
}
.head {
  margin-top: 170px;
  margin-bottom: 35px;
}
</style>
