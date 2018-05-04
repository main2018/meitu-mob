<template lang="pug">
  .pc-list
    .pc-list-swiper
      swiper(
        :images="imgs"
        :auto="false"
        v-show="!isInSubHome"
        )
    //.pc-list-cover(v-show="contents.length === 0")
      .img(:style="coverStyle")
    .pc-card-wrapper(
      v-for="content in contents"
      v-show="isInSubHome"
      )
      card(:content="content")
</template>

<script type="text/ecmascript-6">
  import { js } from './pc-list-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './pc-list.styl'
</style>
