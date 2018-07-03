const { _2space } = require('common/js')
exports.js = () => {
  const PcNav = require('pc/pc-nav/pc-nav')
  const Swiper = require('base/swiper/swiper')
  const Card = require('base/card/show-card/card')
  return {
    name: 'home-vue',
    components: {
      Swiper,
      PcNav,
      Card
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        contents: [],
        logo: '',
        keyword: ''
      }
    },

    computed: {
      path () { return this.$route.path },
      albums () { return this.$store.getters.albums },
      allAlbums () { return this.$store.getters.allAlbums },
      siteLogo () { return this.$store.getters.settings.logo },
      commendAlbums () {
        return this.$store.getters.commendAlbums
      },
      imgs () {
        let imgs = []
        this.commendAlbums.forEach(album => {
          album.img && imgs.push({
            type: 'image',
            id: album.id,
            src: album.img
          })
        })
        return imgs
      }
    },

    watch: {
      path () { getAlbums.call(this) },
      siteLogo () {
        if (this.siteLogo) {
          let logo = this.getLocal('siteLogo')
          let img = this.$qiniuUrl(logo)
          this.logo = logo ? img : ''
        }
      }
    },

    methods: {
    },

    mounted () {
      this.$nextTick(() => { getAlbums.call(this) })
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
