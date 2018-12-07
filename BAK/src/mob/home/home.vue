<template lang="pug">
  #home
    .item(v-for="item in categories" @click="goUrl(item.route)")
      category-card(:content="item")
</template>

<script type="text/ecmascript-6">
  import { js } from './home-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './home.styl'
</style>
