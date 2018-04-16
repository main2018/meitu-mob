exports.js = () => {
  const LinkCard = require('base/link-card/link-card')
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
      category () {
        let categories = this.$store.getters.categories
        let categoryName = this.album.category.category
        categories.forEach((item) => {
          if (item.category === categoryName) {
            this.hasLink = item.hasLink
            this.hasArticle = item.hasArticle
            this.hasVideo = item.hasVideo
          }
        })
      },
      album () { return this.$store.getters.currAlbum },
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
      console.log(this.album)
    }
  }
}
