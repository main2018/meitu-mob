exports.js = () => {
  const LinkCard = require('base/card/link-card/link-card')
  const { getQiniuPosterUrl } = require('common/js/qiniu-api')
  const { getRemoteImgSize } = require('common/js')
  const { timeFormat } = require('common/js')
  const Gallery = require('base/gallery')
  return {
    name: 'detail',
    components: {
      LinkCard,
      Gallery
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
        let category = album && album.category && album.category.category
        categories.forEach((item) => {
          if (item.category === category) {
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
      getImgSize (filename) {
        let width = 0
        let height = 0
        let img = new Image()
        img.src = `${this.$http}${filename}`
        let interVal = setInterval(() => {
          if (img.width > 0 || img.height > 0) {
            width = width || img.width
            height = width || img.height
            clearInterval(interVal)
            return { width, height }
          }
        }, 40)
        getRemoteImgSize(img).then(size => size)
      },
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
