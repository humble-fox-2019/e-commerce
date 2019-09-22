<template>
  <section id="cart-page" class="py-3">
    <div class="container">
      <navbar />
      <div class="row pt-5">
        <div class="col-md-12">
          <table class="table">
            <thead class="bg-primary text-white">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Otto</td>
                <td class="text-warning">Rp. 200.000</td>
                <td><button class="btn btn-danger" style="float:right">Delete</button></td>
              </tr>              
            </tbody>    
          </table>
        </div>
        <div class="col-md-12">
          <table class="table">
            <thead class="bg-primary text-white">
              <tr>
                <th scope="col">Total Price</th>                
              </tr>
            </thead>
            <tbody>
              <tr>                
                <td class="text-warning">Rp. 200.000</td>
              </tr>
            </tbody>    
          </table>
          <button class="btn btn-primary">
              checkout
              <i class="fa fa-check ml-2"></i>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "cart",
  components: {
    Navbar
  }
};
</script>

<style>
</style>