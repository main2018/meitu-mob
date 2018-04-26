<template lang="pug">
  .pc-aside
    .brand
      img.logo(v-if="logo" :src="logo")
    ul.nav(
      v-if="menus.length > 0"
      v-for="(menu, idx) in menus"
      :key="menu.name"
      )
      li.item(
        :class="menu.active ? 'active' : ''"
        @click="setStatus(idx)"
        ) {{menu.name}}
</template>

<script type="text/ecmascript-6">
  import { js } from './pc-aside-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './pc-aside.styl'
  .pc-aside
    padding .5rem 1rem
  .logo
    height 2.5rem
    margin-bottom: 1rem
  .item
    cursor pointer
  .active:before
    margin-left: -1rem
    content "►"
</style>
