<template lang="pug">
  .file-upload(v-show="show")
    input.upload(
      ref="file"
      type="file"
      :accept="accept"
      style="display: none"
      @change="getFiles($event)"
      )
    .mdi.mdi-upload(
      @click="dispatch"
      v-show="showBtn"
      )
      span {{hint}}
    .preview(@click="dispatch")
      .img-preview(v-show="isImage")
        img(:src="cover")
      .video-preview(v-show="isVideo")
        img(:src="poster")
        // video(:poster="poster")
        .play: .mdi.mdi-24px.mdi-play-circle
      .file-preview(v-show="!isImage && !isVideo && this.fname")
        .mdi.mdi-24px.mdi-file-outline
</template>

<script type="text/ecmascript-6">
  import { js } from './file-upload-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './file-upload.styl'
</style>
