<template lang="pug">
  .home
    .aside
      adminAside(@clicked="getCategory")
    .content
      p {{breadcrumb}}
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
    breadcrumb () {
      if (this.categories.length === 0) { return '' }
      return this.categories.reduce((pre, nxt) => {
        return `${pre} / ${nxt}`
      })
    }
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
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable.styl'
@import './home.styl'
</style>
