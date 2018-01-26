<template lang="pug">
  #amap
    #container
</template>

<script type="text/ecmascript-6">
  import { loadScript, initMap } from './amap-util'
  export default {
    name: 'vue-amap',
    data () {
      return {
      }
    },

    props: {
      initZoom: {
        type: Number,
        default: 16
      }
    },

    methods: {
    },

    created () {
      const APP_KEY = '103606a500d2aad32dd532c11c099f3a'
      loadScript(APP_KEY).then(initMap)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './amap.styl'
#amap
  #container
    height 100vh
</style>
