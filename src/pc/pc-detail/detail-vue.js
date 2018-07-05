exports.js = () => {
  const LinkCard = require('base/card/link-card/link-card')
  const { getQiniuPosterUrl } = require('common/js/qiniu-api')
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
      },
      imgs () {
        let imgs = []
        if (!this.album.images) { return }
        this.album.images.forEach(img => {
          console.log(img)
          imgs.push({
            url: img.url || img.uri,
            size: this.getImgSize(img.uri),
            width: 900,
            height: 1500
          })
        })
        console.log(imgs)
        return imgs
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
            console.log({ width, height })
          }
        }, 40)
        img.onload = () => {
          width = width || img.width
          height = width || img.height
          console.log({ width, height })
        }
        return { width, height }
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
