<template lang="pug">
  .card-show-pc
    .cover
      .img(:style="getBgStyle(content.img)" @click="goDetail")
    .text
      h1.title {{content.title}}
      p.time {{timeFormat(content.time)}}
      p.desc {{content.desc}}
      .more more...
</template>

<script type="text/ecmascript-6">
  import { js } from './card-show-pc-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './card-show-pc.styl'
</style>
