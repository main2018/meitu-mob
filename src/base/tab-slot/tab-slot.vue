<template lang="pug">
  .tab-container
    .tab-title
      ul.tab-menu
        li.tab-item(
          v-for="(item, index) in menu"
          @click="tap(index)"
          ) {{item}}
      .tab-color(
        v-show="menu.length > 0"
        :style="colorStyle"
        )

    .tab-padding(v-show="menu.length > 0")
    .tab-content-wrap
      ul.tab-content(
        ref="content"
        :style="contentStyle"
        )
        li.tab-page(
          v-for="(item, index) in menu"
          @touchstart="touchstart(index)"
          @touchmove="touchmove(index)"
          @touchend="touchend(index)"
          )
          slot(
            v-if="menu.length > 0"
            :name="'slot-'+index"
            )
    slot(
      v-if="menu.length === 0"
      :name="'slot-0'"
      )
</template>

<script type="text/ecmascript-6">
  import { js } from './tab-slot-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './tab-slot.styl'
</style>
