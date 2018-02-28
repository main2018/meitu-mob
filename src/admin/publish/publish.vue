<template lang="pug">
  .publish.bd-1px-l(ref="form")
    // p {{breadcrumb}}
    .form-wrapper
      customform
</template>

<script type="text/ecmascript-6">
  import { js } from './publish-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'
  @import './publish.styl'
  .aw-item
    padding .5rem 0
    background: #eee;
    display flex
    .aw-warn
      color red
    label
      padding-left 15px
      display inlineblock
      width: 5rem;
      background: none;
</style>
