<template lang="pug">
  .detail

    .aw-article
      h1.aw-title {{album.title}}
      time.aw-category {{time}}
        span(v-if="album.subcategory")  &nbsp;| {{album.subcategory.subcategory}}
      p.aw-desc {{album.desc}}
    .aw-video(v-if="album.hasVideo" v-for="video in album.videos")
      video(
        v-show="video.uri"
        controls
        preload="auto"
        :poster="getPoster(video.uri)"
        )
        source(:src="`${http}${video.uri}`")
    .aw-link(v-if="album.hasLink")
      link-card(:content="album.links")
    .aw-content(v-html="album.article" v-if="album.hasArticle")
</template>

<script type="text/ecmascript-6">
  import { js } from './detail-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'
  @import './detail.styl'
</style>
