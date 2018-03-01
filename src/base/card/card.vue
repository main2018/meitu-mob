<template lang="pug">
  .card(ref="card")
    // img(
      :src="content.img"
      )
    .img(
      ref="img"
      :style="coverImgStyle"
      )
    h3(
      v-text="content.title"
      @click="goDetail"
      ) {content.title}
    time(v-text="content.time")
</template>

<script type="text/ecmascript-6">
  import { js } from './card-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl'
@import './card.styl'
</style>
