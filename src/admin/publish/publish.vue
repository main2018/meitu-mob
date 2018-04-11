<template lang="pug">
  .publish.bd-1px-l(ref="form")
    admin-header(
      :title="'Publisher | ' + breadcrumb"
      :btns="['close']"
      @close="$emit('close')"
      )
</template>

<script type="text/ecmascript-6">
  import { js } from './publish-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'
  @import './publish.styl'
</style>
