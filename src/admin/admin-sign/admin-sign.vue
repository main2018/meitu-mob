<template lang="pug">
  .admin-sign
    .sign
      img.logo(v-if="logo" :src="logo")
      signin(:hasSignup="false")
</template>

<script type="text/ecmascript-6">
  import { js } from './admin-sign-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './admin-sign.styl'
  .admin-sign
    overflow hidden
    left 0
    top 0
    width 100vw
    height 100vh
    background $bg
    .sign
      padding-top 5rem
      margin 0 auto
      width 20rem
      text-align center
    img
      max-height 5rem
      margin-bottom 2rem
</style>
