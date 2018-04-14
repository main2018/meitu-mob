<template lang="pug">
  .detail

    .aw-article
      h1.aw-title {{album.title}}
      time.aw-category {{time}}
        span(v-if="album.subcategory")  &nbsp;| {{album.subcategory.subcategory}}
      p.aw-desc {{album.desc}}
    .aw-content(v-html="album.content" v-show="album.hasArticle")
    .aw-video(
      v-if="album.hasVideo"
      v-for="video in album.videos"
      )
      //video.video(
        width="300vw"
        :poster="`${http}${video.cover}`"
        :src="getUrl(video.video)"
        controls="controls"
        )
      video(
        controls
        preload="auto"
        :poster="`${http}${video.cover}`"
        )
        source(:src="`${http}${video.video}`")
        Your browser does not support the video tag.
</template>

<script type="text/ecmascript-6">
  import { js } from './detail-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'
  @import './detail.styl'
</style>
