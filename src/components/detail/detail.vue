<template lang="pug">
  .detail
    //video.video(
      v-if="currItem.vedio"
      :poster="currItem.vedioPoster"
      :src="currItem.vedio"
      controls="controls"
      )

    .aw-article
      h1.aw-title {{album.title}}
      time.aw-category {{timeFormat(album.createAt)}} | &nbsp;
        span(v-if="album.subcategory") {{album.subcategory.subcategory}}
      p.aw-desc {{album.desc}}
    .aw-content(v-html="album.content")
</template>

<script type="text/ecmascript-6">
  import { js } from './detail-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'
  @import './detail.styl'
</style>
