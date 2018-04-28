<template lang="pug">
  .pc-aside
    .brand
      img.logo(v-if="logo" :src="logo" @click="goHome")
    ul.nav(
      v-if="menus.length > 0"
      v-for="(menu, idx) in menus"
      :key="menu.name"
      )
      li.category {{menu.category}}
        .subcategory(
          v-for="(item, _idx) of menu.subcategories"
          :class="isActive(menu.category, item.name) ? 'active' : ''"
          @click="go(idx, _idx)"
          ) {{item.name}}

</template>

<script type="text/ecmascript-6">
  import { js } from './pc-aside-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './pc-aside.styl'
  .pc-aside
    position fixed
    padding .5rem 1rem
  .logo
    cursor pointer
    height 2.5rem
    margin-bottom: 1rem
  .category
    font-weight 700
    color #fff
  .subcategory
    line-height 1.6rem
    font-size .8rem
    cursor pointer
    color #ccc

  .active:before
    margin-left: -.8rem
    font-size .8rem
    content "►"
</style>
