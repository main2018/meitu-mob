exports.js = () => {
  const LinkCard = require('base/card/link-card/link-card')
  const { getQiniuPosterUrl } = require('common/js/qiniu-api')
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
        hasArticle: true,
        hasImage: true,
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
            this.hasImage = item.hasImage
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
        return getQiniuPosterUrl(video)
      },
      playVid () { this.video.play() },
      enableMute () { this.video.muted = false }
    },

    mounted () {
    }
  }
}
