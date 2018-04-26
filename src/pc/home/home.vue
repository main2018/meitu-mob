<template lang="pug">
  .pc-home-wrapper(:style="bgStyle")
    .pc-home
      .pc-aside
        pc-aside
      .pc-content
        router-view
      .pc-panels-wrapper
        .pc-panels
          pc-nav
</template>

<script type="text/ecmascript-6">
  import { js } from './home-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './home.styl'
</style>
