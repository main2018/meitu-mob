<template lang="pug">
  section
    .item(v-for="(img, index) in imgs" :style="genStyleOfItem(img)")
      i(:style="genStyleOfDomI(img)")
      img(:src="$http + img.url" :alt="index")
      p {{img}}
</template>

<script>
export default {
  props: {
    imgs: { type: Array, default: () => [] }
  },
  data () {
    return {
    }
  },
  methods: {
    genStyleOfItem ({width, height}) {
      const flexGrow = width * 200 / height
      width = flexGrow + 'px'
      return [{ width, flexGrow }]
    },
    genStyleOfDomI ({width, height}) {
      const paddingBottom = height / width * 100 + '%'
      return { paddingBottom }
    }
  },
  created () {
  }
}
</script>

<style lang="stylus" scoped>
section
  display: flex
  flex-wrap: wrap
  &::after
    content: ''
    flex-grow: 999999999
  .item
    position: relative
    flex-grow: 1
    margin: 2px
    background-color: #eee
    i
      display: block
    img
      position: absolute
      top: 0
      width: 100%
      border: 0
      vertical-align: bottom
</style>
