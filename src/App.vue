<template>
  <div id="app">
    <keep-alive include="Home">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
// import vconsole from 'vconsole'
export default {
  components: {
  },
  name: 'app',
  data () {
    return {
    }
  },

  mounted () {
    if (this.getLocal('siteName')) {
      document.title = this.getLocal('siteName')
    }
    console.log(this.isPc)
    this.$store.dispatch('getCategory')
    this.$store.dispatch('getAllAlbum')
    this.$store.dispatch('getSettings')
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  #app
    background: $color-bg;
</style>
