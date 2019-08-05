<template lang="pug">
  section
    .img-item(v-for="(img, index) in images" :style="genStyleOfItem(img)")
      i(:style="genStyleOfDomI(img)")
      img(
        :alt="index"
        :src="$http + (img.url || img.uri)"
        @click="preview(index)"
        )
    .viewer(v-show="isViewrShow")
      .mask(@click="close")
      // .mdi.mdi-36px.mdi-close(@click="close")
      .mdi.mdi-36px.mdi-chevron-left(@click="next(true)")
      .mdi.mdi-36px.mdi-chevron-right(@click="next(false)")
      img.img(:src="currImg.url" :style="getViewrStyle(currImg.radio)")
      .text {{currImg.text}}
</template>

<script>
const { getRemoteImgsSize } = require('../../common/js')
export default {
  props: {
    imgs: { type: Array, default: () => [] }
  },
  data () {
    return {
      images: [],
      isViewrShow: false,
      currIndex: 0,
      currImg: {
        url: '',
        text: '',
        ratio: 0
      }
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
      const flexGrow = width * 250 / height
      width = flexGrow + 'px'
      return [{ width, flexGrow }]
    },
    genStyleOfDomI ({width, height}) {
      const paddingBottom = height / width * 100 + '%'
      return { paddingBottom }
    },
    getViewrStyle (radio) {
      let style = {}
      if (radio <= 1) {
        style.marginTop = '2rem'
        style.height = '75vh'
      } else if (radio < 2.5 && radio > 1) {
        style.height = '45vw'
      } else if (radio >= 2.5) {
        style.marginTop = '20vh'
        style.width = '98vw'
      }
      return style
    },
    preview (index) {
      this.currIndex = index
      this.isViewrShow = true
      const image = this.images[index]
      const { text, width, height, uri, url: path } = image
      const url = this.$http + (path || uri)
      const radio = width / height
      this.currImg = { url, radio, text }
    },
    close () { this.isViewrShow = false },
    next (isLeft) {
      const max = this.images.length - 1
      if (isLeft && this.currIndex === 0) {
        this.currIndex = max + 1
      }
      if (!isLeft && this.currIndex === max) {
        this.currIndex = 0
      } else {
        isLeft ? this.currIndex-- : this.currIndex++
      }
      this.preview(this.currIndex)
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
  .img-item
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
.viewer
  position fixed
  width 100vw
  height calc(100vh - 3rem)
  overflow hidden
  top 3.7rem
  left 0
  text-align: center;
  .mask
    position: absolute
    z-index: -1;
    top: 0;
    width: 100%;
    height: 100%;
    background rgba(0, 0, 0, 0.7)
  .mdi
    position: absolute
    padding .5rem
    width 2rem
    height 2rem
    line-height: 2rem;
    // background-color: rgba(0, 0, 0, 0.5);
    text-align center
    border-radius 50%
    color #fff
    cursor pointer
    transition .4s
    color #fff
    filter opacity(.5)
    &:hover
      transform scale(2)
      filter opacity(1)
  .mdi-close
    top: 0;
    right: 1rem;
  .mdi-chevron-left
    top 35vh
    left 1vw
  .mdi-chevron-right
    top 35vh
    right 1vw
  .img
    border solid 5px #fff;
    background-color: #FFF;
  .text
    position: absolute
    padding .5rem 2vw
    bottom 1rem
    width: 96vw;
    text-align: left;
    color #aaa
    background-color: rgba(0, 0, 0, 0.8)
</style>
