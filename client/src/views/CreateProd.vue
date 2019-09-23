<template>
  <div>
    <v-app style="display : 'flex'; 'justify-content':'center'">
      <h1>Form Create Product</h1>
      <form action @submit.prevent="createProd">
        <div class="makeitfancy">
          <div>
            <br />
            <v-text-field v-model="productName" label="Product Name" outlined></v-text-field>
            <v-text-field
              type="number"
              min="1"
              v-model="stock"
              width="20px"
              class="num"
              outlined
              label="stock"
            ></v-text-field>
            <v-text-field
              type="number"
              min="10000"
              v-model="price"
              class="num1"
              block
              outlined
              label="price"
            ></v-text-field>
            <input type="file" id="file" ref="file" v-on:change="getImage($event)" />
          </div>
          <div>
            <v-radio-group v-model="category">
              <v-radio label="Snack" value="Snack"></v-radio>
              <v-radio label="Accesories" value="Acesories"></v-radio>
              <v-radio label="Medicine" value="Medicine"></v-radio>
              <v-radio label="Action Figue" value="Action Figure"></v-radio>
            </v-radio-group>
            <v-textarea
              v-model="description"
              outlined
              label="Description"
              name="input-7-1"
              hint="Hint text"
            ></v-textarea>
            <v-btn dark type="submit">Submit</v-btn>
          </div>
        </div>
      </form>
    </v-app>
  </div>
</template>

<script>
import axios from 'axios'
const baseUrl = 'http://35.240.225.157'
// const baseUrl = 'http://localhost:3000'

export default {
  data () {
    return {
      productName: '',
      image: '',
      category: '',
      description: '',
      stock: '',
      price: ''
    }
  },
  methods: {
    getImage () {
      let file = event.target.files || event.dataTransfer.files
      this.image = file[0]
    },
    createProd () {
      let formdata = new FormData()
      formdata.set('image', this.image)
      formdata.set('productName', this.productName)
      formdata.set('category', this.category)
      formdata.set('description', this.description)
      formdata.set('stock', this.stock)
      formdata.set('price', this.price)
      axios({
        method: 'post',
        url: baseUrl + '/products/create',
        data: formdata,
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          this.$toastr.Add({
            title: 'Success create new product',
            msg: '',
            clickClose: false,
            timeout: 2000,
            position: 'toast-top-center',
            type: 'success',
            preventDuplicates: true,
            style: {
              backgroundColor: ' #129171',
              width: '525px',
              'font-size': '21pt'
            }
          })
        })
        .catch(err => {
          let string = err.response.data.message.join('<br>')
          this.$toastr.Add({
            title: 'Upss Something wrong..',
            msg: string,
            clickClose: false,
            timeout: 2000,
            position: 'toast-top-center',
            type: 'warning',
            preventDuplicates: true,
            style: {
              backgroundColor: '#e7623a',
              width: '525px',
              'font-size': '21pt'
            }
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #800080;
}

form {
  width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 auto;
}
.v-input#stock {
  width: 20px;
}
.v-text-field.num {
  width: 80px;
}
.v-text-field.num1 {
  width: 200px;
}
.v-text-field {
  font-size: 12pt;
}
.makeitfancy {
  display: flex;
  justify-content: space-around;
}
.v-textarea {
  width: 400px;
}
h1 {
  margin-top: 40px;
  margin-bottom: 20px;
}
</style>
