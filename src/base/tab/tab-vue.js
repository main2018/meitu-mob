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
  let category = this.path.match(/\/(\S*)$/)[1]
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
