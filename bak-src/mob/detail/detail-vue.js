exports.js = () => {
  const LinkCard = require('base/card/link-card/link-card')
  const { getQiniuPosterUrl } = require('common/js/qiniu-api')
  const { timeFormat } = require('common/js')
  return {
    inject: ['hideMenu'],
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
      categories () { return this.$store.getters.categories },
      album () {
        let album = this.$store.getters.currAlbum
        let category = album && album.category && album.category.category
        this.categories.forEach((item) => {
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
      isSubpage () {
        const category = this.album.category.category
        let isSubpage = false
        this.categories.forEach(item => {
          if (item.category !== category) { return }
          isSubpage = item.isSubpage
        })
        return isSubpage
      }
    },

    watch: {
    },

    methods: {
      hideBar () {
        this.hideMenu()
      },
      getPoster (video) {
        return getQiniuPosterUrl(video)
      },
      playVid () { this.video.play() },
      enableMute () { this.video.muted = false },
      // toTop () { scrollTo(0, 0) }
      toTop () { scrollTo({top: 0, behavior: 'smooth'}) }
    },

    mounted () {
      this.toTop()
    }
  }
}
