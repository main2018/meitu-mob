exports.js = () => {
  const { MIN_DISTANCE } = require('common/constant')
  const { SWIPE_SPEED } = require('../../../../config')
  const { getBgStyle } = require('common/js')
  const SwiperThumbnail = require('./swiper-thumbnail.vue')
  return {
    name: 'swiper',
    components: {
      SwiperThumbnail
    },

    created () {
    },

    props: {
      images: { type: Array, default: () => [] },
      thumbnail: { type: Boolean, default: false },
      auto: { type: Boolean, default: false }
    },

    data () {
      return {
        isMouseDown: false,
        activeIndex: 0,
        contentLeft: 0
      }
    },

    computed: {
      ulDom () { return this.$refs.content },
      count () { return this.images.length },
      contentStyle () { return `margin-left:${this.contentLeft}px` }
    },

    watch: {
      images () {
        this.initLayout()
      }
    },

    filters: {
      getBgStyle
    },

    methods: {
      getUrl (uri) {
        return this.$qiniuUrl(uri)
      },
      swipeTo (activeIndex) {
        this.activeIndex = activeIndex
        let itemWidth = this.ulDom.offsetWidth / this.count
        this.contentLeft = -activeIndex * itemWidth
      },
      mouseover () { this.clearAuto() },
      mouseout () { this.setAuto() },

      mousedown () {
        this.isMouseDown = true
        let { offsetX, offsetY } = event
        this.startX = offsetX
        this.startY = offsetY
      },
      mousemove () {
        if (!this.isMouseDown) { return }
        let { offsetX, offsetY } = event
        this.distX = offsetX - this.startX
        this.distY = offsetY - this.startY
      },
      mouseup () {
        this.isMouseDown = false
        this.touchend()
      },

      touchstart () {
        const touch = event.targetTouches[0]
        this.startX = touch.clientX
        this.startY = touch.clientY
      },
      touchmove () {
        const touch = event.targetTouches[0]
        this.distX = touch.clientX - this.startX
        this.distY = touch.clientY - this.startY
      },
      touchend () {
        const {
          isToLeft, isToLeftOver, isToRight, isToRightOver, isAxisX
        } = this.getDirection()

        if (isToLeft && !isToLeftOver && isAxisX) {
          this.swipeTo(++this.activeIndex)
        } else if (isToRight && !isToRightOver && isAxisX) {
          this.swipeTo(--this.activeIndex)
        }
      },
      getDirection () {
        let isToLeft = this.distX < -MIN_DISTANCE
        let isToLeftOver = this.activeIndex >= this.count - 1
        let isToRight = this.distX > MIN_DISTANCE
        let isToRightOver = this.activeIndex <= 0
        let isAxisX = Math.abs(this.distX) - Math.abs(this.distY) > 0
        return { isToLeft, isToLeftOver, isToRight, isToRightOver, isAxisX }
      },
      initLayout () {
        let width = `${this.count * 100}%`
        this.ulDom.style.width = width
      },
      getDotClass (num) {
        let flag = num - 1 === this.activeIndex
        return flag ? 'aw-swiper-active' : ''
      },

      setAuto () {
        if (!this.auto || this.interval) { return }
        this.interval = setInterval(() => {
          let isToLeftOver = this.activeIndex >= this.count - 1
          this.activeIndex = isToLeftOver ? 0 : this.activeIndex + 1
          this.swipeTo(this.activeIndex)
        }, SWIPE_SPEED)
      },
      clearAuto () {
        window.clearInterval(this.interval)
        this.interval = null
      },
      thumbnailSelect (index) {
        this.swipeTo(index)
      }
    },

    mounted () {
      this.initLayout()
      this.setAuto()
    },

    destroyed () { this.clearAuto() }
  }
}
