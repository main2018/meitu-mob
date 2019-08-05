<template lang="pug">
.pc-list(:style="{ backgroundImage, height }")
    ul.pc-content(v-if="!hasLink")
      li.pc-list-item(
        v-for="content in contents"
        v-show="!content.hasLink"
        )
        card(:content="content" :is-pc="true")

    .media-layout(v-if="hasLink")
      .pc-media-show
      ul.pc-media-list
        li.pc-media-item(v-for="(links, index) in albumLinks" key="index")
          link-card(:content="links")
</template>

<script type="text/ecmascript-6">
  import { js } from './pc-list-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './pc-list.styl'
  .pc-list
    background-size: cover;
    min-height calc(100vh - 11.55rem - 60px)
  .pc-content
    margin: 0 auto
    padding-bottom: 50px;
  .pc-list-item
    margin 10px 0 0 10px
    display inline-block
  @media ( max-width: 419px )
    .pc-list-item
      width calc(100% - 21px)
  @media ( min-width: 420px) and ( max-width: 749px )
    .pc-list-item
      width calc(50% - 15px)
  @media ( min-width: 750px) and ( max-width:1023px )
    .pc-list-item
      width calc(33% - 11px)
  @media ( min-width:1024px ) and ( max-width: 1599px)
    .pc-list-item
      width calc(25% - 12px)
  @media ( min-width:1600px )
    .pc-list-item
      width calc(20% - 12px)

  .media-layout
    position absolute
    left 0
    bottom 0
    width: 70vh
    height 80vh
    z-index: 100;
    .pc-media-show
      width: 100%;
      height: 100%;
      background-size: cover;
      background-image: url('/static/iPhoneX.png')
      width: 100%
    .pc-media-list
      position absolute
      top 4.7vh
      left 28vh
      width: 30vh
      height: 63vh
      overflow-x: hidden
      overflow-y: auto
      &::-webkit-scrollbar
        display: none
    .pc-media-item
      margin: 2vh 1vh
</style>
