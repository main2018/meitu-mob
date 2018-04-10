exports.js = () => {
  const { VUE_SERVER } = require('config/vue-remote-server.js')
  const { timeFormat } = require('common/js')
  return {
    name: 'detail',
    components: {
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        currItem: {},
        http: VUE_SERVER
      }
    },

    computed: {
      id () { return this.$route.query.id },
      video () { return this.$refs.video },
      album () { return this.$store.getters.currAlbum }
    },

    watch: {
    },

    methods: {
      timeFormat,
      playVid () {
        this.video.play()
      },
      enableMute () {
        this.video.muted = false
      },
      getUrl (video) {
        console.log(`${this.http}${video}`)
        return `${this.http}${video}`
      }
    },

    mounted () {
      console.log(this.album)
      this.currItem = this.$store.getters.currPhoto
    }
  }
}
