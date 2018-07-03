<template lang="pug">
  ul.nav-wrapper
    li.nav(v-for="item in categories" :key="item.route")
      .item(@click="go(item)")
        .text: p {{item.name}}&nbsp;{{item.category}}
        .hint-color(v-show="isHintShow(item.route)")
</template>

<script type="text/ecmascript-6">
  import { js } from './pc-nav-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './pc-nav.styl'
</style>
