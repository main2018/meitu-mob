<template lang="pug">
  .card(ref="card")
    .btn(v-show="btn")
      .mdi.mdi-close(@click="del")
    .img(:style="getBgStyle(content.img)" @click="goDetail")
    .title(
      v-text="content.title"
      @click="goDetail"
      ) {content.title}
    .foot
      .time(
        v-if="content.time"
        v-text="timeFormat(content.time)"
        )
      .category(v-if="content.subcategory || content.category")
        span.mdi(
          v-show="btn"
          :class = "!content.status ? 'mdi-eye' : 'mdi-eye-off'"
          ) &nbsp;|&nbsp;
        span {{content.category}}
        span(v-if="content.subcategory")  | {{content.subcategory}}
</template>

<script type="text/ecmascript-6">
  import { js } from './card-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable.styl'
@import './card.styl'
</style>
