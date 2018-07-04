<template>
  <div id="app">
    <mob-bar v-if="!isPc"></mob-bar>
    <keep-alive include="Home">
      <router-view></router-view>
    </keep-alive>
    <!-- <inscribe v-if="!isPc"></inscribe> -->
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
// import vconsole from 'vconsole'
import { getClientType } from 'common/js/user-agent'
import MobBar from 'mob/bar/bar'
import Inscribe from 'mob/inscribe/inscribe'
export default {
  components: {
    MobBar,
    Inscribe
  },
  name: 'app',
  data () {
    return {
      isPc: getClientType() === 'PC'
    }
  },

  mounted () {
    if (this.getLocal('siteName')) {
      document.title = this.getLocal('siteName')
    }
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
