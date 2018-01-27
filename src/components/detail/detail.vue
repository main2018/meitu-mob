<template lang="pug">
  .detail
    video.video(
      v-if="currItem.vedio"
      :poster="currItem.vedioPoster"
      :src="currItem.vedio"
      controls="controls"
      )

    .article
      h1 {{currItem.title}}
      time {{currItem.time}}
      p {{currItem.desc}}
    ul(v-if="currItem.imgs")
      li(v-for="img in currItem.imgs")
        img(:src="img")
</template>

<script type="text/ecmascript-6">
  import { js } from './detail-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './detail.styl'
</style>
