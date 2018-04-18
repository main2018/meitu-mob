exports.js = () => {
  const { qiniuUpload, qiniuDel } = require('common/js/qiniu-api.js')
  const { QINIU_URL_PREFIX } = require('config')
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
        let query = '?vframe/jpg/offset/1/w/640/h/360'
        let poster = `${QINIU_URL_PREFIX}${this.fname}${query}`
        return this.isVideo && this.fname ? poster : ''
      },
      cover () {
        let img = `${QINIU_URL_PREFIX}${this.fname}`
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
