<template lang="pug">
  .sub-publish
    div.title
      .mdi.mdi-24px.mdi-library-plus(@click="dispatch")
      .text {{title}}
      .mdi.mdi-24px.mdi-plus-box(@click="add")

    sortable(@change="setList", :className="dragClass")
      .item.tu-sortable-item.handle(
        v-for="(content, idx) in contents_"
        )
        .cover(@click="getIdx(idx)")
          file-upload(
            :accept="`${type}/*`"
            :hint="btnHint"
            :fname="content.uri"
            @changed="getFile"
            )
        .input-wrapper
          .url
            span {{urlHint}}: &nbsp;
            input(
              type="text"
              placeholder="http://"
              v-model="content.url"
              @change="emit"
              )
            .operator(v-show="contents_.length > 1")
              .mdi.mdi-close(@click="del(idx)")
          textarea(
            :placeholder="descHint"
            v-model="content.text"
            @change="emit"
            )
    input.upload(
      ref="file"
      type="file"
      :accept="`${type}/*`"
      style="display: none"
      multiple="true"
      @change="getFiles($event)"
      )
</template>

<script type="text/ecmascript-6">
  import { js } from './sub-publish-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './sub-publish.styl'
</style>
