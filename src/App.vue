<template>
  <div id="app">
    <mob-bar v-if="!$isPc" ref="mobBar"></mob-bar>
    <pc-bar v-else v-show="!isAdminRoute"></pc-bar>

    <keep-alive include="Home">
      <router-view></router-view>
    </keep-alive>
    <pc-inscribe v-if="$isPc" v-show="!isAdminRoute"></pc-inscribe>
    <inscribe v-else></inscribe>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
// import vconsole from 'vconsole'
import MobBar from 'mob/bar/bar'
import PcBar from 'pc/pc-bar/pc-bar'
import Inscribe from 'mob/inscribe/inscribe'
import PcInscribe from 'pc/pc-inscribe'
export default {
  components: {
    MobBar,
    PcBar,
    Inscribe,
    PcInscribe
  },
  name: 'app',
  data () {
    return {
    }
  },

  computed: {
    isAdminRoute () {
      return /^\/admin/gi.test(this.$route.path)
    }
  },

  provide () {
    return { hideMenu: this.hideMenu }
  },
  methods: {
    hideMenu () {
      if (this.$refs.mobBar) {
        this.$refs.mobBar.hideMenu()
      }
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
