const { _2space } = require('common/js')
exports.js = () => {
  const { CLIENT_HTTP } = require('../../../../config')
  const LinkCard = require('base/card/link-card/link-card')
  const Card = require('base/card/show-card/card')
  return {
    name: 'pc-list',
    components: {
      LinkCard,
      Card
    },

    created () {
    },

    props: {
      isHomePage: {
        type: Boolean,
        default: false
      }
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
      categories () { return this.$store.getters.categories },
      albumLinks () { return this.$store.getters.albumLinks },
      iPhoneX () { return `${CLIENT_HTTP}/static/iPhoneX.png` },
      hasLink () {
        let category = this.categories.filter(item => item.category === this.category)
        return category[0] ? category[0].hasLink : false
      },
      backgroundImage () {
        return this.hasLink ? `url('/static/media-bg.jpg')` : ''
      },
      height () {
        return this.hasLink ? `calc(100vh - 11.55rem - 60px)` : ''
      }
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

      if (!this.hasLink) { return }
      this.$store.dispatch('getAlbumLinks', this.category)
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
