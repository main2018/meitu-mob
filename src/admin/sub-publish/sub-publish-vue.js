exports.js = () => {
  // const { QINIU_URL_PREFIX } = require('config')
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
      btnHint: { type: String, default: 'upload' },
      descHint: { type: String, default: 'desc' },
      type: {
        Type: String,
        default: ''
      }
    },

    watch: {
      contents () {
        // console.log('in Sub watch: ', this.contents)
        this.contents_ = this.contents
        // console.log('in sub data: ', this.title, this.contents)
      }
    },

    data () {
      return {
        idx: 0,
        file: '',
        contents_: [{
          file: '',
          url: '',
          text: '',
          order: 10
        }]
      }
    },

    computed: {
    },

    methods: {
      /*
      getPoster (file) {
        let query = '?vframe/jpg/offset/1/w/640/h/360'
        let poster = `${QINIU_URL_PREFIX}${file}${query}`
        console.log(poster)
        return poster
      },
      */
      add () {
        this.contents_.push({
          file: '',
          url: '',
          text: '',
          order: this.no++
        })
      },
      del (idx) {
        this.contents_.splice(idx, 1)
        this.emit()
      },
      getIdx (idx) { this.idx = idx },
      getFile (fname) {
        this.contents_[this.idx].file = fname
        this.emit()
      },
      emit () { this.$emit('changed', this.contents_) }
    },

    mounted () {
      // this.$set(this.contents_[0], 'file', 'VV1ytHWOhR.mp4')
      // fname: 'VV1ytHWOhR.mp4'
      // fname: 'C9yfupwJLv.jpg'
      // fname: 'C9yfupwJLv.doc'
    }
  }
}
