<template lang="pug">
  .aw-swiper
    div.aw-swiper-wrap
      ul.aw-swiper-content(ref="content" :style="contentStyle")
        li.aw-swiper-item(
          v-for="(image, idx) in images"
          :key="image"
          @mouseover="mouseover"
          @mouseout="mouseout"
          @mousedown="mousedown"
          @mousemove="mousemove"
          @mouseup="mouseup"
          @touchstart="touchstart"
          @touchmove="touchmove"
          @touchend="touchend"
          )
          .aw-swiper-img(:style="getBgStyle(image)")
    ul.aw-swiper-nav
      li.aw-swiper-l
      li.aw-swiper-dot(
        v-for="num of count"
        :key="num"
        :class="getDotClass(num)"
        @click="swipeTo(num - 1)"
        )
      li.aw-swiper-r
</template>

<script type="text/ecmascript-6">
  import { js } from './swiper-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './swiper.styl'
</style>
