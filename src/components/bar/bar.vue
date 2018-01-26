<template lang="pug">
  .head-wrapper
    .head
      .bar
        .brand(@click="goHome") Logo
        .icon(v-text="sign", @click="toggle")
      menu.menu(v-show="menuShow")
        ul
          li(@click="go('/photo')") Photo
          li(@click="go('/design')") Pic
          li(@click="go('/vedio')") Vedio
          li.search
            input(type="text")
            .hint search
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
