<template lang="pug">
  .home
    // .aside
      adminAside(@clicked="getCategory")
    .content
      publish(:crumb="categories")
</template>

<script>
import AdminAside from 'admin/aside/aside'
import Publish from 'admin/publish/publish'
export default {
  name: 'home',
  components: {
    AdminAside,
    Publish
  },

  props: {
  },

  data () {
    return {
      categories: []
    }
  },

  computed: {
  },

  watch: {
  },

  methods: {
    getCategory (category) {
      this.categories = category
    }
  },

  mounted () {
    this.$store.dispatch('getAlbums')
    this.$store.dispatch('getCategory')
    console.log('ttt: ', this.$store.getters)
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable.styl'
@import './home.styl'
</style>
