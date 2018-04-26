const { _2space } = require('common/js')
exports.js = () => {
  return {
    name: 'pc-list',
    components: {
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        menu: [],
        contents: []
      }
    },

    computed: {
      path () { return this.$route.path },
      albums () { return this.$store.getters.albums }
    },

    watch: {
      path () { getAlbums.call(this) }
    },

    methods: {
    },

    mounted () {
      getAlbums.call(this)
      this.$store.dispatch('setSubNavMenu', this.menu)
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
