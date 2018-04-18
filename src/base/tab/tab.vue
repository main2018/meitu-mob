<template lang="pug">
  .tab-container(v-if="isTabValid")
    .tab-title
      ul.tab-menu
        li(v-for="(item, index) in menu" @click="tap(index)") {{item}}
      .tab-color(v-show = "menu.length > 0" :style="colorStyle")

    .tab-padding(v-show="menu.length > 0")
    .tab-content-wrap
      ul.tab-content(
        ref="content"
        :style="contentStyle"
        )
        li.tab-page(
          v-for="content in contents"
          @touchstart="touchstart(index)"
          @touchmove="touchmove(index)"
          @touchend="touchend(index)"
          )
          .card-wrapper(v-for="item in content")
            card(:content="item")
    .no-subcategory(v-if="!isTabShow")
      .card-wrapper(v-for="item in rootAlbums")
        card(:content="item")
</template>

<script type="text/ecmascript-6">
  import { js } from './tab-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './tab.styl'
</style>
