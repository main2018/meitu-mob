exports.js = () => {
  const LinkCard = require('base/card/link-card/link-card')
  const { QINIU_URL_PREFIX } = require('config')
  const { timeFormat } = require('common/js')
  return {
    name: 'detail',
    components: {
      LinkCard
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        http: QINIU_URL_PREFIX,
        hasArticle: true,
        hasVideo: true,
        hasLink: true
      }
    },

    computed: {
      album () {
        let album = this.$store.getters.currAlbum
        let categories = this.$store.getters.categories
        let categoryName = album.category && album.category.category
        categories.forEach((item) => {
          if (item.category === categoryName) {
            this.hasLink = item.hasLink
            this.hasArticle = item.hasArticle
            this.hasVideo = item.hasVideo
          }
        })
        return album
      },
      time () {
        if (this.album && this.album.meta) {
          return timeFormat(this.album.meta.updatedAt)
        }
        return ''
      }
    },

    watch: {
    },

    methods: {
      getPoster (video) {
        if (!video) { return '' }
        let query = '?vframe/jpg/offset/1/w/640/h/360'
        return `${QINIU_URL_PREFIX}${video}${query}`
      },
      playVid () { this.video.play() },
      enableMute () { this.video.muted = false }
    },

    mounted () {
    }
  }
}
