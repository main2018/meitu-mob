exports.js = () => {
  const { qiniuDel } = require('common/js/qiniu-api.js')
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
      urlHint: { type: String, default: 'link' },
      btnHint: { type: String, default: 'upload' },
      descHint: { type: String, default: 'desc' },
      type: { Type: String, default: '' }
    },

    watch: {
      contents () {
        if (this.contents.length === 0) {
          this.contents_ = [{ uri: '', url: '', text: '', order: 10 }]
          return
        }
        this.contents_ = this.contents
      }
    },

    data () {
      return {
        idx: 0,
        contents_: [{ uri: '', url: '', text: '', order: 10 }]
      }
    },

    computed: {
    },

    methods: {
      add () {
        this.contents_.push({
          uri: '',
          url: '',
          text: '',
          order: this.no++
        })
      },
      del (idx) {
        let uri = this.contents_.uri
        uri && qiniuDel(uri)
        this.contents_.splice(idx, 1)
        this.emit()
      },
      clean () {
        this.contents_ = [{ uri: '', url: '', text: '', order: 10 }]
        this.emit()
      },
      getIdx (idx) { this.idx = idx },
      getFile (fname) {
        this.contents_[this.idx].uri = fname
        this.emit()
      },
      emit () { this.$emit('changed', this.contents_) }
    },

    mounted () {
    }
  }
}
