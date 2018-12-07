<template lang="pug">
  .head-wrapper(v-show="url !== '/admin'")
    .head
      div.bar
        .brand(@click="goHome")
          img.logo(v-if="logo" :src="logo")
          // .logo Logo
        hamburg-icon(:size="48" color="white" @toggle="toggle" :isMenu="!menuShow")
      menu.menu(v-show="menuShow")
        ul
          li(
            v-for="item in categories"
            @click="go(`/${item.route}`)"
            ): .text
              p {{item.category}}{{item.name}}
              .hint-color(v-show="isHintShow(item.route)")

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
