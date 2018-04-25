<template lang="pug">
  ul.nav-wrapper
    li.nav
      .item
        .trangle
        .text: p one
        .mark: span
    li.nav
      .item
        .trangle
        .text: p tow test
        .mark: span
    li.nav
      .item
        .trangle
        .text: p three
        .mark: span
</template>

<script type="text/ecmascript-6">
  import { js } from './pc-nav-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './pc-nav.styl'
</style>
