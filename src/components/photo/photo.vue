<template lang="pug">
  .photo
    .wrap(v-for="item in photos.one")
      card(:content="item")
</template>

<script type="text/ecmascript-6">
  import { js } from './photo-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './photo.styl'
</style>
