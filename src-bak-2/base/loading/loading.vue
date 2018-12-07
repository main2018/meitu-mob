<template lang="pug">
  .loading-wrapper(
    v-show="show"
    :class="bgClass"
    )
    .loading
      span
      span
      span
      span
      span
      span
      span
      span
    .hint {{hint}}
</template>

<script>
export default {
  name: 'loading',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    cheme: {
      type: String,
      default: 'full'
    },
    hint: {
      type: String,
      default: 'loading ...'
    }
  },
  computed: {
    bgClass () {
      let style = ''
      switch (this.cheme) {
        case 'block':
          style = 'loading-block'
          break
        case 'simple':
          style = 'loading-simple'
          break
        default:
          style = 'loading-full'
      }
      return style
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './loading.styl'
</style>
