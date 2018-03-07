<template lang="pug">
  .head-wrapper
    .head
      div.bar
        .brand(@click="goHome")
          .logo Logo
        .icon(v-text="sign", @click="toggle")
      menu.menu(v-show="menuShow")
        ul
          li(
            v-for="item in categories"
            @click="go(`/${item.category}`)"
            ): .text
              p {{item.category}}
              .hint-color(v-show="url==='/' + item.category")

          // li(@click="go('/video')")
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
