exports.js = () => {
  const { qiniuUpload, qiniuDel } = require('common/js/qiniu-api.js')
  const { QINIU_URL_PREFIX } = require('config')
  return {
    name: 'file-upload',
    components: {
    },

    created () {
    },

    props: {
      hint: { type: String, default: 'image' },
      multilple: { type: Boolean, default: false },
      show: { type: Boolean, default: true },
      showBtn: { type: Boolean, default: true },
      file: { type: String, default: '' },
      accept: { type: String, default: '*' }
    },

    data () {
      return {
        // fname: 'VV1ytHWOhR.mp4'
        // fname: 'C9yfupwJLv.jpg'
        // fname: 'C9yfupwJLv.doc'
        fname: ''
      }
    },

    computed: {
      isVideo () {
        let reg = /\.(mp4|avi|mov)$/gi
        return reg.test(this.fname)
      },
      isImage () {
        let reg = /\.(jpg|jpeg|png|gif|bmp)$/gi
        return reg.test(this.fname)
      },
      poster () {
        let query = '?vframe/jpg/offset/1/w/640/h/360'
        let cover = `${QINIU_URL_PREFIX}${this.fname}${query}`
        return this.isVideo ? cover : ''
      },
      img () {
        let img = `${QINIU_URL_PREFIX}${this.fname}`
        return this.isImage ? img : ''
      }
    },

    watch: {
    },

    methods: {
      getFiles (ev) {
        this.$store.dispatch('setLoadingHint', 'upload...')
        let file = event.target.files[0]
        this.fname && qiniuDel(this.fname)
        qiniuUpload(file, fname => {
          this.fname = fname
          this.$store.dispatch('hideLoading')
          this.$emit('changed', this.fname)
        })
        console.log(ev)
      },
      dispatch () { this.$refs.file.click() }
    },

    mounted () {
    }
  }
}
