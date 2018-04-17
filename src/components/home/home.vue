<template lang="pug">
  #home
    ul
      // li(@click="$router.push('/photo')") Photo
      li.item(
        v-for="item in categories"
        @click="goUrl (item.route)"
        )
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
