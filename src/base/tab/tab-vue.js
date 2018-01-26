exports.js = () => {
  return {
    name: 'tab',
    components: {
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        index: 0,
        contentLeft: 0,
        list: [1, 2, 3],
        content: ['one', 'two', 'three']
      }
    },

    watch: {
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
      count () { return this.list.length },
      dom () { return this.$refs.content },
      contentStyle () {
        return `margin-left:${this.contentLeft}px`
      },
      colorStyle () {
        let left = `${this.index * 100 / this.count}%`
        let width = `width: ${100 / this.count}%`
        return `${width};margin-left:${left}`
      },
      isTabValid () {
        return this.list.length === this.content.length
      }
    },

    mounted () {
      let width = `${this.count * 100}%`
      this.dom.style.width = width
    }
  }
}
