v.tpd
<template lang="pug">
  .media-detail
    p media-detail
    .iframe(
      ref="iframeWrapper"
      )
    // iframe(
      :url="newUrl"
      frameborder="0"
      scrolling="no"
      @locad="setData"
      )

</template>

<script type="text/ecmascript-6">
import { js } from './media-detail-vue.js'
export default js.call(this)
</script>


<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl'
@import './media-detail.styl'
</style>
      @load="setIframeHeight(this)"
