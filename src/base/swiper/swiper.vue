<template lang="pug">
  .aw-swiper
    div.aw-swiper-wrap
      ul.aw-swiper-content(ref="content" :style="contentStyle")
        li.aw-swiper-item(
          v-for="(item, idx) in images"
          :key="'swiper' + idx"
          @mouseover="mouseover"
          @mouseout="mouseout"
          @mousedown="mousedown"
          @mousemove="mousemove"
          @mouseup="mouseup(item)"
          @touchstart="touchstart"
          @touchmove="touchmove"
          @touchend="touchend(item)"
          )
          .aw-swiper-img(
            :style="getBgStyle(item.src, ratio)"
            )

    ul.aw-swiper-nav(v-if="!thumbnail && count > 1")
      li.aw-swiper-l
      li.aw-swiper-dot(
        v-for="num of count"
        :key="num"
        :class="[getDotClass(num), inside ? 'aw-swiper-inside' : '']"
        @click="swipeTo(num - 1)"
        )
      li.aw-swiper-r

    ul.aw-swiper-thumbnail(v-if="thumbnail && count > 1")
      swiper-thumbnail(
        :images="images"
        :activeIndex="activeIndex"
        @select="thumbnailSelect"
        )
</template>

<script type="text/ecmascript-6">
  import { js } from './swiper-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './swiper.styl'
</style>
