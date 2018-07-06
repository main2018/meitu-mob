<template lang="pug">
  section
    .item(v-for="(img, index) in images" :style="genStyleOfItem(img)")
      i(:style="genStyleOfDomI(img)")
      img(:src="$http + (img.url || img.uri)" :alt="index")
</template>

<script>
const { getRemoteImgsSize } = require('../../common/js')
export default {
  props: {
    imgs: { type: Array, default: () => [] }
  },
  data () {
    return {
      images: []
    }
  },
  watch: {
    imgs () {
      getRemoteImgsSize(this.imgs)
      .then(images => { this.images = images })
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
    },
    getImgSize () {
    }
  },
  created () {
  },
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
section
  padding 2px
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
