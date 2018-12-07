exports.js = () => {
  const { MIN_DISTANCE } = require('common/constant')
  const { getBgStyle } = require('common/js')
  return {
    name: 'swiper-thumbnail',
    components: {
    },

    created () {
    },

    props: {
      images: { type: Array, default: () => [] },
      activeIndex: { type: Number, default: 0 }
    },

    data () {
      return {
        contentLeft: 0,
        currIndex: 0
      }
    },

    computed: {
      count () { return this.images.length },
      needSwipe () { return this.count > 5 },
      wrapperStyle () {
        let width = `width: ${20 * this.count}%;`
        let currCount = ~~(this.currIndex / 5)
        let margin = `margin-left:${-currCount * 100}%;`
        return `${margin}${width}`
      }
    },

    watch: {
      activeIndex () {
        this.currIndex = this.activeIndex
      }
    },

    methods: {
      getBgStyle,
      swipeToLeft () {
        if (this.currIndex < 5) { return }
        this.currIndex -= 5
      },
      swipeToRight () {
        if (this.currIndex >= this.count - 1) { return }
        this.currIndex += 5
      },

      mousedown () {
        console.clear()
        console.log('down')
        this.isMouseDown = true
        this.startX = event.offsetX
      },
      mousemove () {
        if (!this.isMouseDown) { return }
        this.distX = event.offsetX - this.startX
        /*
        if (!this.needSwipe && Math.abs(this.distX) > MIN_DISTANCE) {
          this.isMouseDown = false
          return alert(`can't swipe`)
        }
        */
      },
      mouseup () {
        this.isMouseDown = false
        this.touchend()
        console.log('up')
      },
      touchend () {
        const {
          isToLeft, isToLeftOver, isToRight, isToRightOver
        } = this.getDirection()
        if (!this.needSwipe) { return }

        if (isToLeft && !isToLeftOver) {
          this.currIndex += 5
        } else if (isToRight && !isToRightOver) {
          this.currIndex -= 5
        }
        console.log(this.currIndex)
      },
      getDirection () {
        let isToLeft = this.distX < -MIN_DISTANCE
        let isToLeftOver = this.currIndex >= this.count - 1
        let isToRight = this.distX > MIN_DISTANCE
        let isToRightOver = this.currIndex <= 0
        return { isToLeft, isToLeftOver, isToRight, isToRightOver }
      }
    },

    mounted () {
    }
  }
}

