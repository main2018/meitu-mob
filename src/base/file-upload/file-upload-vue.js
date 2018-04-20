exports.js = () => {
  const {
    qiniuUpload,
    qiniuDel,
    getQiniuPosterUrl
  } = require('common/js/qiniu-api.js')
  return {
    name: 'file-upload',

    props: {
      hint: { type: String, default: 'image' },
      show: { type: Boolean, default: true },
      showBtn: { type: Boolean, default: true },
      fname: { type: String, default: '' },
      accept: { type: String, default: '*' }
    },

    computed: {
      isVideo () {
        let reg = /\.(mp4|avi|mov)$/gi
        return reg.test(this.fname)
      },
      isImage () {
        let reg = /\.(jpg|jpeg|png|gif|bmp|svg)$/gi
        return reg.test(this.fname)
      },
      poster () {
        let poster = getQiniuPosterUrl(this.fname)
        return this.isVideo && this.fname ? poster : ''
      },
      cover () {
        let img = this.$qiniuUrl(this.fname)
        return this.isImage && this.fname ? img : ''
      }
    },

    methods: {
      getFiles (ev) {
        this.$store.dispatch('setLoadingHint', 'upload...')
        let file = event.target.files[0]
        this.fname && qiniuDel(this.fname)
        qiniuUpload(file, fname => {
          this.$store.dispatch('hideLoading')
          this.$emit('changed', fname)
        })
      },
      dispatch () { this.$refs.file.click() }
    }

  }
}
