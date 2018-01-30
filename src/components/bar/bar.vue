<template lang="pug">
  .head-wrapper
    .head
      .bar
        .brand(@click="goHome") Logo
        .icon(v-text="sign", @click="toggle")
      menu.menu(v-show="menuShow")
        ul
          li(@click="go('/about')")
            .text
              p about
              .hint-color(v-show="url==='/about'")
          li(@click="go('/photo')")
            .text
              p Photo
              .hint-color(v-show="url==='/photo'")
          li(@click="go('/design')")
            .text
              p design
              .hint-color(v-show="url==='/design'")
          li(@click="go('/media')")
            .text
              p media
              .hint-color(v-show="url==='/media'")
          li(@click="go('/video')")
            .text
              p Video
              .hint-color(v-show="url==='/video'")
          li.search
            input(type="text")
            .hint
              span.mdi.mdi-magnify
              span search
    .head-padding
</template>

<script type="text/ecmascript-6">
import { js } from './bar-vue.js'
export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './bar.styl'
</style>
