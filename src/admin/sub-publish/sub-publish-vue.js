exports.js = () => {
  const ImgUpload = require('base/img-upload/img-upload')
  const FileUpload = require('base/file-upload/file-upload')
  return {
    name: 'sub-publish',
    components: { ImgUpload, FileUpload },
    created () {
      this.no = 11
    },

    props: {
      contents: { type: Array, default: () => [] },
      title: { type: String, default: '' },
      type: {
        Type: String,
        default: 'content'
      }
    },

    data () {
      return {
        idx: 0,
        contents_: [{
          cover: {},
          content: {},
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
        this.contents_.push({
          cover: {},
          content: {},
          url: '',
          order: this.no++,
          text: ''
        })
      },
      del (idx) {
        this.contents_.splice(idx, 1)
        this.emit()
      },
      getIdx (idx) { this.idx = idx },
      getImg (ev) {
        this.contents_[this.idx].cover = ev.target.files
        this.emit()
      },
      getcontent (ev) {
        this.contents_[this.idx].content = ev.target.files
        this.emit()
      },
      emit () {
        this.$emit('change', this.contents_)
      }
    },

    mounted () {
    }
  }
}
