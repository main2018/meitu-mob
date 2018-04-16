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
        currItem: {},
        http: QINIU_URL_PREFIX
      }
    },

    computed: {
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
        let query = '?vframe/jpg/offset/1/w/640/h/360'
        return `${QINIU_URL_PREFIX}${video}${query}`
      },
      playVid () { this.video.play() },
      enableMute () { this.video.muted = false }
    },

    mounted () {
      this.currItem = this.$store.getters.currPhoto
    }
  }
}
