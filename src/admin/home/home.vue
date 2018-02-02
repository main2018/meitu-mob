<template lang="pug">
  .home
    .aside
      adminAside
    .content
      p home
</template>

<script>
import adminAside from 'admin/aside/aside'
export default {
  name: 'home',
  components: {
    adminAside
  },

  props: {
  },

  data () {
    return {
    }
  },

  computed: {
  },

  watch: {
  },

  methods: {
  },

  mounted () {
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable.styl'
@import './home.styl'
</style>
