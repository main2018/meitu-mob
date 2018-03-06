exports.js = () => {
  return {
    name: 'tab',
    props: {
      menu: {
        type: Array,
        default: () => [1, 2, 3]
      },
      showActive: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        index: 0,
        contentLeft: 0
      }
    },

    watch: {
      count () {
        let width = `${this.count * 100}%`
        this.dom.style.width = width
      }
    },

    methods: {
      tap (index) {
        this.index = index
        this.contentLeft = -index * window.innerWidth
      },
      touchstart () {
        let touch = event.targetTouches[0]
        this.startX = touch.clientX
      },
      touchmove () {
        let touch = event.targetTouches[0]
        this.detaX = touch.clientX - this.startX
      },
      touchend () {
        let OFFSET = 40
        let notOver = this.index < this.count - 1
        if (this.detaX < -OFFSET && notOver) {
          this.index++
          this.tap(this.index)
        } else if (this.detaX > OFFSET && this.index > 0) {
          this.index--
          this.tap(this.index)
        } else {
          return
        }
      }
    },

    computed: {
      count () { return this.menu.length },
      dom () { return this.$refs.content },
      contentStyle () {
        return `margin-left:${this.contentLeft}px`
      },
      colorStyle () {
        let left = 0
        let width = '100%'
        if (this.count) {
          left = `${this.index * 100 / this.count}%`
          width = `width: ${100 / this.count}%`
        }
        return `${width};margin-left:${left}`
      }
    },

    mounted () {
    }
  }
}
