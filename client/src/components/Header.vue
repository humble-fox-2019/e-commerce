<template>
  <div class="header">
    <Logo></Logo>
    <SearchBar></SearchBar>
    <Menu></Menu>
  </div>
</template>

<script>

import Logo from '../components/Logo'
import SearchBar from '../components/SearchBar'
import Menu from '../components/Menu'

export default {
  name: 'Header',
  components: {
    Logo,
    SearchBar,
    Menu
  }
}
</script>

<style>

</style>