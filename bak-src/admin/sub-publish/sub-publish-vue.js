exports.js = () => {
  const Sortable = require('base/sortable/sortable.vue')
  const FileUpload = require('base/file-upload/file-upload')
  const {
    qiniuUploads,
    qiniuDel
  } = require('common/js/qiniu-api.js')
  return {
    name: 'sub-publish',
    components: { FileUpload, Sortable },
    created () {},

    props: {
      dragClass: { type: String, default: 'tu-drag' },
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
          this.contents_ = [{ uri: '', url: '', text: '', order: 0 }]
          return
        }
        this.contents_ = this.contents
      }
    },

    data () {
      return {
        idx: 0,
        contents_: [{ uri: '', url: '', text: '', order: 0 }]
      }
    },

    computed: {
    },

    methods: {
      setList (oldIndex, newIndex) {
        let cache = []
        this.contents_.forEach(item => { cache.push(item) })
        this.contents_ = []
        this.$nextTick(() => {
          const newVal = cache.splice(newIndex, 1, cache[oldIndex])[0]
          cache.splice(oldIndex, 1, newVal)
          this.contents_ = cache
          this.refreshOrder()
        })
      },
      refreshOrder () {
        this.contents_.forEach((item, index) => { item.order = index })
      },
      add () {
        this.contents_.push({
          uri: '',
          url: '',
          text: '',
          order: this.contents_.length
        })
      },
      del (idx) {
        let uri = this.contents_.uri
        uri && qiniuDel(uri)
        this.contents_.splice(idx, 1)
        this.refreshOrder()
        this.emit()
      },
      clean () {
        this.contents_ = [{ uri: '', url: '', text: '', order: 0 }]
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
              order: this.contents_.length
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
