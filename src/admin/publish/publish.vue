<template lang="pug">
  .publish(ref="form")
    admin-header(
      :title="compTitle + '  |  ' + breadcrumb"
      :btns="['cancel', 'submit', 'close', isNew ? '' : 'reset']"
      @reset="$emit('reset', id)"
      @close="close"
      @cancel="clean"
      @submit="submit"
      )
    .admin-container
      div.card(v-show="!isSubpage")
        card-input(
          ref="card"
          @changed="getCard"
          :content="card"
          )
      div.image(v-show="hasImage")
        sub-publish(
          dragClass="tu-drag-one"
          ref="image"
          title="Image"
          btnHint="Image"
          type="Image"
          :contents="images"
          @changed="getImages"
          )
      div.video(v-show="hasVideo")
        sub-publish(
          dragClass="tu-drag-two"
          ref="video"
          title="Videos"
          btnHint="Video"
          type="Video"
          :contents="videos"
          @changed="getVideos"
          )
      div.image(v-show="hasLink")
        sub-publish(
          dragClass="tu-drag-three"
          ref="link"
          title="Links"
          btnHint="Cover"
          descHint="title"
          :contents="links"
          type="Image"
          @changed="getLinks"
          )
      div.input-article(v-show="hasArticle")
        p Article
        // tiny-editor(id="tinymce",
          :html="'item'",
          v-model="article"
          )
        quill-editor(v-model="article")
</template>

<script type="text/ecmascript-6">
  import { js } from './publish-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './publish.styl'
</style>
