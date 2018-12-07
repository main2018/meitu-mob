<template lang="pug">
  .swiper-thumbnail
    div.swiper-thumbnail-wrapper
      .swiper-more.swiper-more-l(
        v-show="currIndex >= 5"
        )
        .mdi.mdi-chevron-left(@click="swipeToLeft")
      .swiper-more.swiper-more-r(
        v-show="count > 5 && currIndex < count -1"
        )
        .mdi.mdi-chevron-right(@click="swipeToRight")

      ul.swiper-thumbnail-content(:style="wrapperStyle")
        li.swiper-thumbnail-item(
          v-for="(img, idx) in images"
          :key="'swiper' + idx"
          @click.stop="$emit('select', idx)"
          )
          .swiper-thumbnail-img(
            :class="idx === activeIndex ? 'swiper-active' : ''"
            :style="getBgStyle(img)"
            ): .mask
          .swiper-thumbnail-title hi nasdf sdf  sdfd googd


        li.swiper-thumbnail-item(
          v-if="!needSwipe"
          v-for="num of count > 5 ? '0' : 5 - count"
          :key="'swiper_' + num"
          ) <!-- process count less than 5 -->

</template>

<script type="text/ecmascript-6">
  import { js } from './swiper-thumbnail-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  .swiper-thumbnail
    position relative
    padding .2rem .5rem .5rem .5rem
    background: #fff;
  .swiper-thumbnail-wrapper
    width: 100%
    overflow-x hidden
    &:hover
      & > .swiper-more
        display block
  .swiper-thumbnail-content
    transition 0.5s
    display flex
    &>.swiper-thumbnail-item
      flex 1
      padding .3rem
      cursor pointer
  .swiper-active
    position: relative
    &>.mask
      position absolute
      top 0
      left 0
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4)
  .swiper-thumbnail-title
    width: 5rem
    margin-top .5rem
    margin-bottom: -.3rem;
    font-size .8rem
    line-height .8rem
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    color #333
  .swiper-more
    display none
    top: 1rem;
    width: 2rem;
    height: 2rem;
    position absolute
    color #888
    cursor pointer
    .mdi
      font-size 1.8rem
  .swiper-more-l
    left -.5rem
  .swiper-more-r
    right -.8rem
</style>
