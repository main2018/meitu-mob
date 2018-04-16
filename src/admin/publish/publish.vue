<template lang="pug">
  .publish.bd-1px-l(ref="form")
    admin-header(
      :title="'Publisher | ' + breadcrumb"
      :btns="['cancel', 'submit', 'close']"
      @close="$emit('close')"
      @cancel="clean"
      @submit="submit"
      )
    .admin-container
      div.card
        card-input(
          ref="card"
          @changed="getCard"
          :content="card"
          )
      div.video(v-show="hasVideo")
        sub-publish(
          ref="video"
          title="Videos"
          btnHint="Video"
          type="Video"
          :contents="videos"
          @changed="getVideos"
          )
      div.image(v-show="hasLink")
        sub-publish(
          ref="link"
          title="Links"
          btnHint="Cover"
          descHint="title"
          :contents="links"
          type="Image"
          @changed="getLinks"
          )
      div.input-article(v-show="hasArticle")
        p content
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
