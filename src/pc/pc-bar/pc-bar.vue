<template lang="pug">
  .pc-bar-wrapper
    .pc-bar-fluid
      .pc-bar
        .pc-brand(@click="$router.push('/')"): img.logo(v-if="logo" :src="logo")
        .pc-nav: pc-nav
        .pc-search
          input(type="text" v-model="keyword")
          .hint
            span.mdi.mdi-magnify
            span(v-show = '!keyword') search
</template>

<script type="text/ecmascript-6">
  import { js } from './pc-bar-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './pc-bar.styl'
</style>
