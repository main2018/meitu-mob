
<template lang="pug">
  .swiper-thumbnail
    div.swiper-thumbnail-wrapper
      ul.swiper-thumbnail-content(:style="wrapperWidthStyle")
        li.swiper-thumbnail-item(v-for="(img, idx) in images")
          .swiper-thumbnail-img(:style="getBgStyle(img)")
          .swiper-thumbnail-title hi nasdf sdf  sdfd googd

</template>

<script type="text/ecmascript-6">
  import { js } from './swiper-thumbnail-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  .swiper-thumbnail
    padding .5rem
    background: #fff;
  .swiper-thumbnail-wrapper
    width: 100%
    overflow-x hidden
  .swiper-thumbnail-content
    transition 0.5s
    display flex
    &>.swiper-thumbnail-item
      padding .3rem
      flex 1
      cursor pointer
  .swiper-thumbnail-title
    width: 4rem
    margin-top .5rem
    line-height 1rem
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    color #333
</style>
