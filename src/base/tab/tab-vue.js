const { _2space } = require('common/js')
const { MIN_DISTANCE } = require('common/constant')
exports.js = () => {
  let Card = {}
  Card = require('base/card/show-card/card')
  return {
    name: 'tab',
    components: {
      Card
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        index: 0,
        contentLeft: 0,
        isTabShow: true,
        menu: [],
        contents: [],
        rootAlbums: []
      }
    },

    watch: {
      path () { getAlbums.call(this) }
    },

    methods: {
      tap (index) {
        this.index = index
        this.contentLeft = -index * window.innerWidth
      },
      isSlide () {
      },
      touchstart () {
        let touch = event.targetTouches[0]
        this.startX = touch.clientX
        this.startY = touch.clientY
      },
      touchmove () {
        let touch = event.targetTouches[0]
        this.distX = touch.clientX - this.startX
        this.distY = touch.clientY - this.startY
      },
      touchend () {
        let isLeft = this.distX < -MIN_DISTANCE
        let isRight = this.distX > MIN_DISTANCE
        let isAxisX = Math.abs(this.distX) - Math.abs(this.distY) > 0
        let isIndexOver = this.index >= this.count - 1
        if (isLeft && !isIndexOver && isAxisX) {
          this.index++
          this.tap(this.index)
        } else if (isRight && this.index > 0 && isAxisX) {
          this.index--
          this.tap(this.index)
        } else { return }
      },
      initLayout () {
        let width = `${this.count * 100}%`
        this.dom.style.width = width
      }
    },

    computed: {
      path () { return this.$route.path },
      count () { return this.menu.length },
      dom () { return this.$refs.content },
      albums () { return this.$store.getters.albums },
      contentStyle () {
        return `margin-left:${this.contentLeft}px`
      },
      colorStyle () {
        let left = `${this.index * 100 / this.count}%`
        let width = `width: ${100 / this.count}%`
        return `${width};margin-left:${left}`
      },
      isTabValid () { return this.menu.length === this.contents.length }
    },

    mounted () {
      getAlbums.call(this)
    }
  }
}

function getAlbums () {
  let path = this.path.match(/\/(\S*)$/)[1]
  let category = _2space(path)
  let currAlbum = this.albums[category]
  if (!currAlbum) {
    initVal.call(this)
    return
  }

  if (!hasKey(currAlbum.subcategory)) {
    initVal.call(this)
    this.rootAlbums = currAlbum.category
    this.isTabShow = false
    return
  }

  initVal.call(this)
  for (let key in currAlbum.subcategory) {
    this.menu.push(key)
    this.contents.push(currAlbum.subcategory[key])
  }
  this.initLayout()
}

function hasKey (obj) {
  let hasKey = false
  for (let key in obj) {
    hasKey = hasKey || key
  }
  return hasKey
}

function initVal () {
  this.rootAlbums = []
  this.menu = []
  this.contents = []
}
