<template lang="pug">
  .dynamic
    p dynamic
</template>

<script type="text/ecmascript-6">
  import { js } from './dynamic-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './dynamic.styl'
</style>
