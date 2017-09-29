<template>
  <div id="app">
    <keep-alive include="Home">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
// import vconsole from 'vconsole'
export default {
  name: 'app'
}
</script>
