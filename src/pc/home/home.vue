<template lang="pug">
  .pc-home-wrapper
    swiper(
      v-show="path !== '/detail'"
      :images="imgs"
      :auto="false"
      ratio="49:20"
      :inside = "true"
      )
    .pc-slogan(
      v-show="path !== '/detail'"
      )
      .title 提供一站式影像视觉解决方案
      .desc IMAGE VERSION && BRAND SERVICE
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
  .pc-home-wrapper
    min-height calc(100vh - 11.55rem - 60px)
  .pc-slogan
    padding 3.5rem 0
    text-align: center
    font-weight: 200
    color #444
    line-height: 3.5rem
    .title
      font-size 1.8rem
    .desc
      font-size .8rem
</style>
