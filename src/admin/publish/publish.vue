<template lang="pug">
  .publish.bd-1px-l(ref="form")
    .form-wrapper
      input(
        ref="file"
        type="file"
        @change="getFiles($event)"
        style="display: none; z-index: -1;"
        )
      p card
      .input-card
        .input-cover
          .upload(@click="dispatch")
            .mdi.mdi-upload cover
          .preview(:style="coverStyle")
        .input-list
          .input-options
            span.hint status
            span.radio
              label online &nbsp;
                input(type="radio" name ="status" checked="checked" value="0" v-model="postJson.status")
              label outline &nbsp;
                input(type="radio" name ="status" value="1" v-model="postJson.status")
            label.video hasvideo &nbsp;
              input(type="checkbox" value="postJson.hasVideo" v-model="postJson.hasVideo")
          ul.input-item
            li
              label * title
              input(type="text" v-model="postJson.title")
            li
              label * desc
              textarea(v-model="postJson.desc")
      p content
      .input-content
        quill-editor(v-model="postJson.content")
      .input-button
        input.reset(v-show="isPublishShow" type="button" value="reset" @click="reset")
        input.reset(v-show="isUpdatesShow" type="button" value="reset" @click="updatesReset")
        input.submit(v-show="isPublishShow" type="button" value="publish" @click="publish")
        input.submit(v-show="isUpdatesShow" type="button" value="update" @click="update")
      // customform
</template>

<script type="text/ecmascript-6">
  import { js } from './publish-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'
  @import './publish.styl'
</style>
