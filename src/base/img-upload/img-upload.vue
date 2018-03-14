<template lang="pug">
  .img-upload(v-show="show")
    input.upload(
      ref="file"
      type="file"
      @change="getFiles($event)"
      multiple="multiple"
      )
    .mdi.mdi-upload(
      @click="dispatch"
      v-show="showBtn"
      )
      span image
    .preview(v-show="imgs.length > 0")
      img(
        v-for="img in imgs" :src="img"
        @click="dispatch"
        )
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
</style>
