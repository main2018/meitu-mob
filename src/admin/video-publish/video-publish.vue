<template lang="pug">
  .video-publish
    div.title
      .text {{title}}
      .mdi.mdi-plus(@click="add")
    div.list(v-for="(video, idx) in videos_")
      .item(@click="getIdx(idx)")
        img-upload(accept="image/*" hint="cover" @change="getImg")
      .item(@click="getIdx(idx)")
        img-upload(accept="video/*" hint="video" @change="getVideo")
      .input-wrapper
        .input
          label.url url: &nbsp;
            input(type="text" placeholder="http://" v-model="video.url")
          label.order No:
            input(type="number" value="10" v-model="video.order")
          .mdi.mdi-close(@click="del(idx)")
        textarea(placeholder="video info" v-model="video.text")
</template>

<script type="text/ecmascript-6">
  import { js } from './video-publish-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './video-publish.styl'
</style>
