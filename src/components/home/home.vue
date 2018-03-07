<template lang="pug">
  #home
    ul
      // li(@click="$router.push('/photo')") Photo
      li(
        v-for="item in categories"
        @click="goUrl (item.category)"
        ) {{_2space(item.category)}}
</template>

<script type="text/ecmascript-6">
  import { js } from './home-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'
  @import './home.styl'
</style>
