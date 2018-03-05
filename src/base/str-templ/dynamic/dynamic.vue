<template lang="pug">
  .dynamic
    tab(:menu="menu")
      .wrap(
        v-for="(photo, index) in photos"
        :slot="'slot-'+index"
        )
        ul.page-content
          li(v-for="item in photo")
            card(:content="item")
</template>

<script type="text/ecmascript-6">
  import { js } from './dynamic-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './dynamic.styl'
</style>
