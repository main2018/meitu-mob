<template lang="pug">
  .mob-detail(v-if="album")

    .aw-article
      h1.aw-title {{album.title}}
      time.aw-category {{time}}
        span(v-if="album.subcategory")  &nbsp;| {{album.subcategory.subcategory}}
      p.aw-desc {{album.desc}}
    .aw-video(v-if="hasVideo" v-for="video in album.videos")
      video(
        v-if="video.uri"
        controls
        preload="auto"
        :poster="getPoster(video.uri)"
        )
        source(:src="$qiniuUrl(video.uri)")
    .aw-image(v-if="hasImage" v-for="image in album.images")
      img(:src="$qiniuUrl(image.uri)")
    .aw-link(v-if="hasLink && album.links && album.links.length > 0")
      link-card(:content="album.links")
    .aw-content(v-html="album.article" v-if="hasArticle")
</template>

<script type="text/ecmascript-6">
  import { js } from './detail-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'
  @import './detail.styl'
</style>
