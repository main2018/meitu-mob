exports.js = () => {
  const { MIN_DISTANCE } = require('common/constant')
  const { getBgStyle } = require('common/js')
  return {
    name: 'swiper',
    components: {
    },

    created () {
    },

    props: {
      images: { type: Array, default: () => [] }
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
    },

    methods: {
      getBgStyle,
      tap (activeIndex) {
        this.activeIndex = activeIndex
        let itemWidth = this.ulDom.offsetWidth / this.count
        this.contentLeft = -activeIndex * itemWidth
      },
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
          isLeft, isLeftOver, isRight, isRightOver, isAxisX
        } = this.getDirection()

        if (isLeft && !isLeftOver && isAxisX) {
          this.activeIndex++
          this.tap(this.activeIndex)
        } else if (isRight && !isRightOver && isAxisX) {
          this.activeIndex--
          this.tap(this.activeIndex)
        } else { return }
      },
      getDirection () {
        let isLeft = this.distX < -MIN_DISTANCE
        let isLeftOver = this.activeIndex >= this.count - 1
        let isRight = this.distX > MIN_DISTANCE
        let isRightOver = this.activeIndex <= 0
        let isAxisX = Math.abs(this.distX) - Math.abs(this.distY) > 0
        return { isLeft, isLeftOver, isRight, isRightOver, isAxisX }
      },
      initLayout () {
        let width = `${this.count * 100}%`
        this.ulDom.style.width = width
      },
      docActiveClass (num) {
        let flag = num - 1 === this.activeIndex
        return flag ? 'aw-swiper-active' : ''
      }
    },

    mounted () {
      this.initLayout()
    }
  }
}
