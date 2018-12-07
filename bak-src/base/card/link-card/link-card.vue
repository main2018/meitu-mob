<template lang="pug">
  .link-card(:class="$isPc ? 'pc' : 'mob'")
    .cover(v-if="cover" @click="go(cover.url)")
      .img(:style="getBgStyle(cover.uri, '16:9')")
      .title {{cover.text}}
    .links(v-if="links.length > 0")
      .link(v-for="link in links" @click="go(link.url)")
        .title
          .text {{link.text}}
          .bd-1px-b
        .img-wrap
          .img(:style="getBgStyle(link.uri, '1:1')")
</template>

<script type="text/ecmascript-6">
  import { js } from './link-card-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './link-card.styl'
</style>
