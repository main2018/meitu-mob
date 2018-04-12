<template lang="pug">
  .publish.bd-1px-l(ref="form")
    admin-header(
      :title="'Publisher | ' + breadcrumb"
      :btns="['reset', 'cancel', 'submit', 'close']"
      @close="$emit('close')"
      )
    .admin-container
      card-input(@changed="getCard")
</template>

<script type="text/ecmascript-6">
  import { js } from './publish-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './publish.styl'
</style>
