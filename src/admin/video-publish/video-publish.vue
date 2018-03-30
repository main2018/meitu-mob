<template lang="pug">
  .video-publish
    div.title
      .text video
      .mdi.mdi-plus(@click="add")
    div.list(v-for="(video, idx) in videos_")
      .item
        img-upload(accept="image/*" hint="cover" @change="getFile")
      .item
        img-upload(hint="video" multiple="!''")
      .input-wrapper
        .input
          label.url url: &nbsp;
            input(type="text" placeholder="http://" v-model="video.url")
          label.order No:
            input(type="number" value="10" v-model="video.no")
          .mdi.mdi-close(@click="del(idx)")
        textarea(placeholder="video info" v-model="video.info")
</template>

<script type="text/ecmascript-6">
  import { js } from './video-publish-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './video-publish.styl'
</style>
