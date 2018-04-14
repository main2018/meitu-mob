<template lang="pug">
  .sub-publish
    div.title
      .text {{title}}
      .mdi.mdi-plus(@click="add")
    div.list(v-for="(content, idx) in contents_")
      .item(@click="getIdx(idx)")
        file-upload(
          :accept="`${type}/*`"
          :hint="btnHint"
          :fname="content.file"
          @changed="getFile"
          )
      .input-wrapper
        .url
          span url: &nbsp;
          input(
            type="text"
            placeholder="http://"
            v-model="content.url"
            @change="emit"
            )
        textarea(
          :placeholder="descHint"
          v-model="content.text"
          @change="emit"
          )
      .operator
        label.order No:
          input(
            type="number"
            value="10"
            v-model="content.order"
            @change="emit"
            )
        .mdi.mdi-close(@click="del(idx)")
</template>

<script type="text/ecmascript-6">
  import { js } from './sub-publish-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './sub-publish.styl'
</style>
