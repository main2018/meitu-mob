exports.js = () => {
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
        currItem: {}
      }
    },

    computed: {
      id () {
        return this.$route.query.id
      },
      video () {
        return this.$refs.video
      },
      album () {
        return this.$store.getters.currAlbum
      }
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
      }
    },

    mounted () {
      this.currItem = this.$store.getters.currPhoto
    }
  }
}
