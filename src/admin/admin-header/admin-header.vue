<template lang="pug">
  .admin-header
    .title {{title}}
    .btn-wrapper
      .btn.added(v-show="btns.includes('add')")
        .mdi.mdi-plus
      .btn.submit(v-show="btns.includes('submit')")
        .mdi.mdi-check
      .btn.reset(v-show="btns.includes('reset')")
        .mdi.mdi-replay
      .btn.cancel(v-show="btns.includes('cancel')")
        .mdi.mdi-cancel
      .btn.close(v-show="btns.includes('close')")
        .mdi.mdi-close
</template>

<script type="text/ecmascript-6">
  import { js } from './admin-header-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './admin-header.styl'
</style>
