const { _2space } = require('common/js')
exports.js = () => {
  const Card = require('base/card/show-card/card')
  return {
    name: 'pc-list',
    components: {
      Card
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        contents: []
      }
    },

    computed: {
      path () { return this.$route.path },
      albums () { return this.$store.getters.albums },
      allAlbums () { return this.$store.getters.allAlbums },
      category () { return _2space(this.path).replace(/^\//g, '') },
      categories () { return this.$store.getters.categories }
    },

    watch: {
      path () {
        this.redirectDetail()
        getAlbums.call(this)
      }
    },

    methods: {
      redirectDetail () {
        if (!this.getIsSubpage()) { return }
        let category = this.category
        this.post('/album/findBySubpage', { category }, album => {
          const route = {
            path: `${this.path}/detail`,
            query: { id: album._id }
          }
          this.$store.dispatch('getCurrAlbum', album._id)
          this.$router.replace(route)
        })
      },

      getIsSubpage () {
        let isSubpage = false
        this.categories.forEach(item => {
          if (item.category !== this.category) { return }
          isSubpage = item.isSubpage
        })
        return isSubpage
      }
    },

    mounted () {
      this.$nextTick(() => {
        this.redirectDetail()
        getAlbums.call(this)
      })
    }
  }
}

function getAlbums () {
  if (this.path === '/') {
    this.contents = this.allAlbums
    return
  }
  let path = this.path.match(/\/(\S*)$/)[1]
  let category = _2space(path)
  let currAlbum = this.albums[category]
  this.contents = []
  if (currAlbum && currAlbum.category) {
    currAlbum.category.forEach((content) => {
      this.contents.push(content)
    })
  }

  if (!(currAlbum && currAlbum.subcategory)) { return }
  for (let key in currAlbum.subcategory) {
    currAlbum.subcategory[key].forEach((content) => {
      this.contents.push(content)
    })
  }
}
