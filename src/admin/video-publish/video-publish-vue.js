exports.js = () => {
  const ImgUpload = require('base/img-upload/img-upload')
  return {
    name: 'video-publish',
    components: {
      ImgUpload
    },

    created () {
    },

    props: {
      videos: {
        type: Array,
        default: () => []
      }
    },

    data () {
      return {
        videos_: []
      }
    },

    computed: {
    },

    watch: {
    },

    methods: {
      add () {
        this.videos_.push({
          cover: '',
          video: '',
          url: '',
          order: '',
          info: ''
        })
      },
      del (idx) {
        this.videos_.splice(idx, 1)
      },
      getFile (ev) {
        console.log(ev)
      }
    },

    mounted () {
    }
  }
}
