<template lang="pug">
  .sub-publish
    div.title
      .text {{title}}
      .mdi.mdi-plus(@click="add")
    div.list(v-for="(content, idx) in contents_")
      .item(@click="getIdx(idx)")
        file-upload(accept="content/*" hint="content" @change="getcontent")
      .input-wrapper
        .url
          span url: &nbsp;
          input(type="text" placeholder="http://" v-model="content.url")
        textarea(placeholder="content info" v-model="content.text")
      .operator
        label.order No:
          input(type="number" value="10" v-model="content.order")
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
