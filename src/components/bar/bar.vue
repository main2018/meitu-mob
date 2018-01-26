<template lang="pug">
  .head
    .bar
      .brand Logo
      .icon(v-text="sign", @click="toogle")
    menu.menu(v-show="menuShow")
      ul
        li About
        li Contact
        li.search
          input(type="text")
          .hint search
</template>

<script type="text/ecmascript-6">
import { js } from './bar-vue.js'
export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './bar.styl'
</style>
