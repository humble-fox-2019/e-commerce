<template>
  <div id="navbar">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <!-- GameStop brand -->
      <b-navbar-brand>
        <i class="fas fa-gamepad"></i> GameStop
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <!-- All the links -->
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/additem">
              <i class="fas fa-plus"></i> Add new item
            </router-link>
          </b-nav-item>

          <b-nav-item>
            <router-link to="/">
              <i class="fas fa-eye"></i> View items
            </router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- Logout button -->
          <b-nav-form>
            <b-nav-item id="logout-nav" href @click.prevent="logout">Logout</b-nav-item>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {}
};
</script>

<style>
</style>