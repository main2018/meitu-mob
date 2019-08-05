exports.js = () => {
  const Swiper = require('base/swiper/swiper')
  const Card = require('base/card/show-card/card')
  const PcList = require('pc/pc-list/pc-list')
  return {
    name: 'home-vue',
    components: {
      Swiper,
      PcList,
      Card
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        keyword: ''
      }
    },

    computed: {
      path () { return this.$route.path },
      commendAlbums () {
        return this.$store.getters.commendAlbums
      },
      imgs () {
        let imgs = []
        this.commendAlbums.forEach(album => {
          album.img && imgs.push({
            type: 'image',
            id: album.id,
            src: album.img,
            category: album.category
          })
        })
        return imgs
      }
    },

    watch: {
    },

    methods: {
    },

    mounted () {
    }
  }
}

