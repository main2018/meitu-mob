exports.js = () => {
  const ImgUpload = require('base/img-upload/img-upload')
  return {
    name: 'video-publish',
    components: {
      ImgUpload
    },

    created () {
      this.no = 11
    },

    props: {
      videos: {
        type: Array,
        default: () => []
      },
      title: {
        type: String,
        default: ''
      }
    },

    data () {
      return {
        idx: 0,
        videos_: [{
          cover: {},
          video: {},
          url: '',
          order: 10,
          text: ''
        }]
      }
    },

    computed: {
    },

    watch: {
    },

    methods: {
      add () {
        this.videos_.push({
          cover: {},
          video: {},
          url: '',
          order: this.no++,
          text: ''
        })
      },
      del (idx) {
        this.videos_.splice(idx, 1)
        this.emit()
      },
      getIdx (idx) { this.idx = idx },
      getImg (ev) {
        this.videos_[this.idx].cover = ev.target.files
        this.emit()
      },
      getVideo (ev) {
        this.videos_[this.idx].video = ev.target.files
        this.emit()
      },
      emit () {
        this.$emit('change', this.videos_)
      }
    },

    mounted () {
    }
  }
}
