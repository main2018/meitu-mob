<template lang="pug">
  .card(ref="card")
    .img(:style="coverImgStyle")
    .title(
      v-text="content.title"
      @click="goDetail"
      ) {content.title}
    .foot
      .time(v-text="format(content.time)")
      .category(v-if="content.subcategory || content.category")
        span {{content.category}}
        span(v-if="content.subcategory")  | {{content.subcategory}}
</template>

<script type="text/ecmascript-6">
  import { js } from './card-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl'
@import './card.styl'
</style>
