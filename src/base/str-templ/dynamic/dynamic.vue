<template lang="pug">
  .dynamic
    // tab(:menu="menu")
      .wrap(
        v-for="(subAlbums, index) in albums"
        :slot="'slot-'+index"
        )
        ul.page-content
          p {{subAlbums}}
          li(v-for="album in subAlbums")
            card(:content="album")
    tab
</template>

<script type="text/ecmascript-6">
  import { js } from './dynamic-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './dynamic.styl'
</style>
