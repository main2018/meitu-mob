<template lang="pug">
  .img-upload(v-show="show")
    input.upload(
      ref="file"
      type="file"
      :accept="accept"
      @change="getFiles($event)"
      multiple="multiple"
      )
    .mdi.mdi-upload(
      @click="dispatch"
      v-show="showBtn"
      )
      span {{hint}}
    .preview()
      img(
        v-show="imgs.length > 0"
        v-for="img in imgs" :src="img"
        @click="dispatch"
        )
      .video(v-show="hasVideo" @click="dispatch")
        .mdi.mdi-24px.mdi-play-circle-outline
      .audio(v-show="hasAudio" @click="dispatch")
        .mdi.mdi-24px.mdi-play-circle-outline
      .doc(v-show="hasDoc" @click="dispatch")
        .mdi.mdi-24px.mdi-file
</template>

<script type="text/ecmascript-6">
  import { js } from './img-upload-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './img-upload.styl'
.img-upload
  .upload
    display none
  .mdi
    cursor pointer
  .preview
  img
    cursor pointer
    height 3rem
    width auto
  .video, .audio, .doc
    height 3rem
    width 4rem
    line-height 3rem
    text-align center
  .video, .audio
    color #aaa
    background #000
  .doc
    color #aaa
    border: 1px solid #ccc;
</style>
