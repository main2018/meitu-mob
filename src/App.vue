<template>
  <div id="app">
    <!-- <bar></bar> -->
    <keep-alive include="Home">
      <router-view></router-view>
    </keep-alive>
    <!-- <inscribe></inscribe> -->
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
// import vconsole from 'vconsole'
import Bar from 'comp/bar/bar'
import Inscribe from 'comp/inscribe/inscribe'
export default {
  components: {
    Bar,
    Inscribe
  },
  name: 'app',
  mounted () {
    this.$store.dispatch('getCategory')
  }
}
</script>
