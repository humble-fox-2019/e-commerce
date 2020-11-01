<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top px-5">
    <a class="navbar-brand pl-5" href="" @click.prevent="goToHome">Grabah Store</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <form class="form-inline my-2 my-lg-0">
            <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search product" aria-label="Search"> -->
        </form>
        <ul class="navbar-nav ml-auto">
          <li>
              <a class="nav-link" href="" @click.prevent="goToProducts">Products <span class="sr-only">(current)</span></a>
          </li>
          <li>
              <a class="nav-link" href="" @click.prevent="goToCart">Cart <span class="sr-only">(current)</span></a>
          </li>
          <li>
              <a class="nav-link" href="" @click.prevent="goToTransactions">Transactions <span class="sr-only">(current)</span></a>
          </li>
          <div class="dropdown show pr-5">
            <a class="dropdown-toggle nav-link" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            User
            </a>

            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a v-if="auth.token" class="dropdown-item" >{{ auth.payload.name }}</a>
              <a v-if="!auth.token" class="dropdown-item" href="" @click.prevent="goToLogin">Login</a>
              <a v-else class="dropdown-item" href="" @click.prevent="signout">Logout</a>
            </div>
          </div>
        </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Navbar',
  computed: mapState(['auth']),
  methods: {
    goToHome () {
      this.$router.push('/')
    },
    goToProducts () {
      this.$router.push('/')
    },
    goToCart () {
      this.$router.push('/cart')
    },
    goToTransactions () {
      this.$router.push('/transactions')
    },
    goToLogin () {
      this.$router.push('/auth/signin')
    },
    signout () {
      this.$swal.fire({
        title: 'Are you sure want to Logout?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Logout!'
      }).then((result) => {
        if (result.value) {
          this.$store.commit('signout')
          this.$router.push('/auth/signin')
        }
      })
    }
  }
}
</script>

<style scoped>
  a{
      color: black;
  }

  navbar {
    margin-left: 20px;
  }
</style>
