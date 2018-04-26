<template lang="pug">
  .pc-index
    p pc-index
</template>

<script type="text/ecmascript-6">
  import { js } from './pc-index-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './pc-index.styl'
  p
    color #fff
</style>
