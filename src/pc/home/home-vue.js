exports.js = () => {
  const PcNav = require('pc/pc-nav/pc-nav')
  const Swiper = require('base/swiper/swiper')
  return {
    name: 'home-vue',
    components: {
      Swiper,
      PcNav
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        logo: '',
        keyword: ''
      }
    },

    computed: {
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
      siteLogo () {
        if (this.siteLogo) {
          let logo = this.getLocal('siteLogo')
          let img = this.$qiniuUrl(logo)
          this.logo = logo ? img : ''
        }
      }
    },

    methods: {
      goHome () {
        this.$router.push(`/`)
        this.menuShow = false
        this.sign = '≡'
      }
    },

    mounted () {
      // document.body.style.backgroundColor = '#333'
      // this.$store.dispatch('setSubNavMenu', '')
    }
  }
}
