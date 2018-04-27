<template lang="pug">
  ul.nav-wrapper
    li.nav(v-for="item in categories" :key="item.route")
      .item(@click="go(item)")
        .trangle
        .text: p {{item.name}}&nbsp;{{item.category}}
        .mark: span

    //li.nav
      .item
        .trangle
        .text: p tow test
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
