<template>
  <div class="container d-flex flex-column justify-content-center" style="margin-top : 100px;">
    <table class="my-table-99">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Image</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product._id">
          <th>{{product.name}}</th>
          <th>{{product.price}}</th>
          <th>{{product.stock}}</th>
          <th class="th-spc"><img :src="product.image" alt="" class="gambar-product-99"></th>
          <th>
            <button class="edit-button-99">Edit</button>
          </th>
          <th>
            <button class="delete-button-99" @click="deleteProduct(product._id)">Delete</button>
          </th>
        </tr>
      </tbody>
    </table>
    <p>Add New Product</p>
    <form enctype="multipart/form-data" v-on:submit.prevent="addProduct" class="d-flex flex-column">
      <div class="mt-1">
        <input type="text" v-model="name" class="my-input-here99" placeholder="product name....">
      </div>
      <div class="mt-3">
        <input type="number" v-model="price" class="my-input-here99" placeholder="price">
      </div>
      <div class="mt-3">
        <input type="number" v-model="stock" class="my-input-here99" placeholder="stock">
      </div>
      <div class="mt-4 ml-5">
        <input type="file" id="file" ref="myFiles" @change="previewFile">
      </div>
      <div class="mt-4">
        <input type="submit" value="add" class="my-button-99">
      </div>
    </form>
    <!-- <form enctype="multipart/form-data" v-on:submit.prevent="addProduct">
      <div class="form-group">
        <label for="exampleInputEmail1">name</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter name"
          v-model="name"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Price</label>
        <input
          type="number"
          class="form-control"
          placeholder="Enter Price"
          v-model="price"
        />
      </div>
      <div class="form-group form-check">
        <input type="file" @change="previewFile" id="file" ref="myFiles" />
        <label class="form-check-label" for="exampleCheck1">image</label>
      </div>
      <div class="form-group form-check">
        <input
          type="number"
          class="form-control"
          placeholder="Enter stock"
          v-model="stock"
        />
        <label class="form-check-label" for="exampleCheck1">Stock</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form> -->
<!-- 
    <table class="table pt-2">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>

<script>
import axios from 'axios';
export default {
  created (){
   this.fetchData()
  },
  methods: {
    fetchData (){
       axios
      .get("http://34.87.84.241/product",{
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
    renderEdit (id){

    },
    addProduct() {
      const bodyFormData = new FormData();
      let { name ,  price ,  stock , image  } = this
      bodyFormData.append('image' , image[0])
      bodyFormData.append('name' , name)
      bodyFormData.append('price'  , price)
      bodyFormData.append('stock' , stock)
      console.log(bodyFormData)
      axios({
        method : 'POST',
        url : 'http://34.87.84.241/product',
        data : bodyFormData,
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        this.fetchData()
        this.name = ''
        this.stock = ''
        this.price = ''
        this.image = ''
        console.log(data)
      })
      .catch(console.log)
    },
    previewFile(){
      this.image = this.$refs.myFiles.files
    },
    deleteProduct (id){
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      .then((result)=>{
        if (result.value) {
          axios({
          method : 'DELETE',
          url : `http://34.87.84.241/product/${id}`,
          headers : {
            token : localStorage.getItem('token')
            }
          })
          .then(({data})=>{
            console.log('')
            this.$swal(
                'Deleted Succesfully!',
                'This Product Has been deleted',
                'success'
              )
            this.fetchData()

          })
          .catch(err=>{
            console.log(err.response)
          })
        }
      })
    }
  },
  data() {
    return {
      name: "",
      price: '',
      stock: '',
      image: "",
      products : [],
      editedId : ''
    };
  }
};
</script>

<style scoped>
  .my-input-here99{ 
    height: 30px;
    width: 260px;
    margin-top: 20px;
    font-family: 'Roboto Condensed', sans-serif;
  }
  .my-button-99 {
    width: 20%;
    background-color: rgb(211, 153, 44);
    border: none;
    color: white;
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 70px;
    font-size: 19px;
    border-radius: 0.9rem;
  }
  .my-table-99 {
    border: 1px solid lightgray;
  }
  .my-table-99 thead {
    background-color: rgb(211, 153, 44);
    color: white;
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 70px;
    font-size: 19px;
    border: none !important;
  }
  .my-table-99 th ,  td {
    border: 1px solid lightgray;
    height: 60px;
  }
  .gambar-product-99 {
    width: 49%;
    height: 89%;
    margin: 0;
    padding: 0;
  }
  .th-spc {
    height: 20px;
    width: 120px;
  }
  .edit-button-99 {
     width: 50px;
     height: 30px;
     background-color: rgb(211, 153, 44);
     border: none;
     border-radius: 0.1rem;
     color: white;
  }
  .delete-button-99 {
     width: 58px;
     height: 30px;
     background-color: #eb6434;
     border: none;
     border-radius: 0.1rem;
     color: white;
  }
</style>