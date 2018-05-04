exports.js = () => {
  const Swiper = require('base/swiper/swiper')
  const { getBgStyle } = require('common/js')
  return {
    name: 'pc-index',
    components: {
      Swiper
    },

    created () {
    },

    props: {
    },

    data () {
      return {
      }
    },

    computed: {
      commendAlbums () {
        return this.$store.getters.commendAlbums
      },
      imgs () {
        let imgs = []
        this.commendAlbums.forEach(album => {
          album.img && imgs.push(album.img)
        })
        return imgs
      }
    },

    watch: {
    },

    methods: {
      getBgStyle
    },

    mounted () {
      this.$store.dispatch('setSubNavMenu', '')
    }
  }
}
