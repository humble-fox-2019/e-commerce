<template>
  <tr>
    <td>
      {{ itemCart.ProductId.name }}
    </td>
    <td>
      Rp {{ itemCart.ProductId.price }}
    </td>
    <td> 
      <span class="fa" @click="min">
        <font-awesome-icon class="mx-2" icon="minus" size="xs"/>
      </span> 
      {{ itemCart.count }} 
      <span class="fa" @click="plus"> 
        <font-awesome-icon class="mx-2" icon="plus" size="xs" /> 
      </span> 
    </td>
    <td>Rp {{ itemCart.ProductId.price * itemCart.count }}</td>
    <td> <span class="fa" @click="deleteCart"> <font-awesome-icon icon="trash-alt"/> </span> </td>
  </tr>
</template>

<script>
export default {
  name: 'CartItem',
  props: ['itemCart'],
  methods: {
    min() {
      this.$store.dispatch('min', this.itemCart._id)
    },
    plus() {
      this.$store.dispatch('plus', this.itemCart._id)
    },
    deleteCart() {
      this.$swal.fire({
        title: 'Are you sure remove it from cart?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('deleteCart', this.itemCart._id)
        }
      })
    }
  }
}
</script>

<style >
 .fa {
     cursor: pointer;
 }
</style>