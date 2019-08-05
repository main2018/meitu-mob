<template lang="pug">
  .category-card
    .img(:style="coverImgStyle")
    .title
      .name(v-show="content.name") {{content.name}}
      .group
        .line
        .category {{content.category}}
</template>

<script type="text/ecmascript-6">
  import { js } from './category-card-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './category-card.styl'
</style>
