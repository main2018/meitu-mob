<template lang="pug">
  .pc-home-wrapper
    .pc-header
      .pc-brand(@click="$router.push('/')"): img.logo(v-if="logo" :src="logo")
      .pc-nav: pc-nav
      .pc-search
        input(type="text" v-model="keyword")
        .hint
          span.mdi.mdi-magnify
          span(v-show = '!keyword') search
    // swiper(
      :images="imgs"
      :auto="false"
      ratio="25rem"
      :inside = "true"
      )
    ul.pc-content
      li(v-for="content in contents")
        card(:content="content")
</template>

<script type="text/ecmascript-6">
  import { js } from './home-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './home.styl'
</style>
