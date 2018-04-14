<template lang="pug">
  .publish.bd-1px-l(ref="form")
    admin-header(
      :title="'Publisher | ' + breadcrumb"
      :btns="['reset', 'cancel', 'submit', 'close']"
      @close="$emit('close')"
      @cancel="cancel"
      )
    .admin-container
      card-input(@changed="getCard" :content="card")
      div.video(v-show="hasVideo")
        sub-publish(
          title="Videos"
          btnHint="Video"
          type="Video"
          :contents="album.videos"
          @changed="getSub"
          )
      // div.image(v-show="hasLink")
        sub-publish(
          ref="link"
          title="Links"
          btnHint="Cover"
          descHint="title"
          type="Image"
          @changed="getSub"
          )
</template>

<script type="text/ecmascript-6">
  import { js } from './publish-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './publish.styl'
</style>
