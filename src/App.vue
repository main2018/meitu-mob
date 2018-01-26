<template>
  <div id="app">
    <bar></bar>
    <keep-alive include="Home">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
// import vconsole from 'vconsole'
import Bar from 'comp/bar/bar'
export default {
  components: {
    Bar
  },
  name: 'app'
}
</script>
