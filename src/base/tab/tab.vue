<template lang="pug">
  .tab-container(v-if="isTabValid")
    .tab-title
      ul.tab-menu
        li(
          v-for="(item, index) in list"
          @click="tap(index)"
          ) {{item}}
      .tab-color(:style="colorStyle")

    .tab-padding
    .tab-content-wrap
      ul.tab-content(
        ref="content"
        :style="contentStyle"
        )
        li(
          v-for="item in content"
          @touchstart="touchstart(index)"
          @touchmove="touchmove(index)"
          @touchend="touchend(index)"
          ) {{item}}
</template>

<script type="text/ecmascript-6">
  import { js } from './tab-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './tab.styl'
</style>
