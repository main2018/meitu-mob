<template lang="pug">
  .img-upload
    input.upload(
      ref="file"
      type="file"
      @change="getFiles($event)"
      multiple="multiple"
      )
    .mdi.mdi-upload(@click="dispatch")
      span image
    .preview(v-show="imgs.length > 0")
      img(v-for="img in imgs" :src="img")
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
    height 3rem
    width auto
</style>
