<template lang="pug">
  .pc-list
    .pc-card-wrapper(v-for="content in subContents")
      Card(:content="content")
</template>

<script type="text/ecmascript-6">
  import { js } from './pc-list-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './pc-list.styl'
</style>
