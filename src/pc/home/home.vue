<template lang="pug">
  .pc-home-wrapper
    swiper(
      v-show="path !== '/detail'"
      :images="imgs"
      :auto="false"
      ratio="25rem"
      :inside = "true"
      )
    router-view
    pc-list
</template>

<script type="text/ecmascript-6">
  import { js } from './home-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './home.styl'
</style>
