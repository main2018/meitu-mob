exports.js = () => {
  const FileUpload = require('base/file-upload/file-upload')
  const {
    qiniuUploads,
    qiniuDel
  } = require('common/js/qiniu-api.js')
  return {
    name: 'sub-publish',
    components: { FileUpload },
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
      getFiles (ev) {
        this.$store.dispatch('setLoadingHint', 'upload...')
        let fileArr = []
        let files = event.target.files
        for (let i = 0; i < files.length; i++) {
          fileArr.push(files[i])
        }
        // this.fname && qiniuDel(this.fname)
        qiniuUploads(fileArr).then(fnames => {
          if (this.contents_[0] && !this.contents_[0].uri) {
            this.contents_ = []
          }
          fnames.forEach(fname => {
            this.contents_.push({
              uri: fname,
              url: '',
              text: '',
              order: this.no++
            })
          })
          this.$store.dispatch('hideLoading')
          this.emit()
        })
      },
      dispatch () { this.$refs.file.click() },
      emit () { this.$emit('changed', this.contents_) }
    },

    mounted () {
    }
  }
}
