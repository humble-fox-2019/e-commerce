<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <a class="navbar-brand" href="" @click.prevent="goToHome">Grabah Store</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search product" aria-label="Search">
        </form>
        <ul class="navbar-nav ml-auto">
            <li>
                <a class="nav-link" href="" @click.prevent="goToProducts">Products <span class="sr-only">(current)</span></a>
            </li>
            <li>
                <a class="nav-link" href="">Transactions <span class="sr-only">(current)</span></a>
            </li>
            <li>
                <a class="nav-link" href="" @click.prevent="goToCart">Cart <span class="sr-only">(current)</span></a>
            </li>
            <li>
                <a class="nav-link" href="">Signout <span class="sr-only">(current)</span></a>
            </li>
        </ul>
    </div>
</nav>
</template>

<script>
export default {
    name: 'Navbar',
    methods: {
        goToHome() {
            this.$router.push('/')
        },
        goToProducts() {
            this.$router.push('/products')
        },
        goToCart() {
            this.$router.push('/cart')
        }
    }
}
</script>

<style scoped>
  a{
      color: black;
  }
</style>