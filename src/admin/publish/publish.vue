<template lang="pug">
  .publish(ref="form")
    p {{breadcrumb}}
</template>

<script type="text/ecmascript-6">
  import { js } from './publish-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'
  @import './publish.styl'
  .aw-style
    color #fff
    background: #000;
  .aw-item
    background: #eee;
</style>
