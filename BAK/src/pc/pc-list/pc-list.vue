<template lang="pug">
  .pc-list
    ul.pc-content
      li.pc-list-item(v-for="content in contents")
        card(:content="content" :is-pc="true")
</template>

<script type="text/ecmascript-6">
  import { js } from './pc-list-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './pc-list.styl'
  .pc-list
    min-height calc(100vh - 11.55rem - 60px)
  .pc-content
    margin: 0 auto
    padding-bottom: 50px;
  .pc-list-item
    margin 10px 0 0 10px
    display inline-block
  @media ( max-width: 419px )
    .pc-list-item
      width calc(100% - 21px)
  @media ( min-width: 420px) and ( max-width: 749px )
    .pc-list-item
      width calc(50% - 15px)
  @media ( min-width: 750px) and ( max-width:1023px )
    .pc-list-item
      width calc(33% - 11px)
  @media ( min-width:1024px ) and ( max-width: 1599px)
    .pc-list-item
      width calc(25% - 12px)
  @media ( min-width:1600px )
    .pc-list-item
      width calc(20% - 12px)
</style>
