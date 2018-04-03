exports.js = () => {
  return {
    name: 'img-upload',
    components: {
    },

    created () {
    },

    props: {
      hint: {
        type: String,
        default: 'image'
      },
      multilple: {
        type: Boolean,
        default: false
      },
      show: {
        type: Boolean,
        default: true
      },
      showBtn: {
        type: Boolean,
        default: true
      },
      images: {
        type: Array,
        default: () => []
      },
      accept: {
        type: String,
        default: '*'
      }
    },

    data () {
      return {
        video: {},
        imgs: [],
        hasDoc: false,
        hasAudio: false,
        hasVideo: false
      }
    },

    computed: {
    },

    watch: {
      images () {
        this.imgs = this.images
      }
    },

    methods: {
      getFiles (event) {
        this.imgs = []
        let method = this.multilple ? 'getImgs' : 'getImg'
        this[method](event)
        this.$emit('change', event)
        this.$emit('preview', this.imgs)
      },
      getImg (event) {
        this.imgs = []
        this.file = event.target.files[0]
        if (!this.file || !window.FileReader) return
        if (/^video/.test(this.file.type)) {
          this.setPreviewType('hasVideo')
        } else if (/^image/.test(this.file.type)) {
          setImgs(this.imgs, this.file)
          this.setPreviewType()
        } else {
          this.setPreviewType('hasDoc')
        }
      },
      setPreviewType (type) {
        this.hasAudio = false
        this.hasVideo = false
        this.hasDoc = false
        this[type] = true
      },

      getImgs (event) {
        this.files = event.target.files
        if (!this.files || !window.FileReader) return
        for (let i = 0; i < this.files.length; i++) {
          if (!/^video/.test(this.file.type)) {
            this.imgs.push('')
            continue
          }
          if (!/^image/.test(this.files[i].type)) { continue }
          setImgs(this.imgs, this.files[i])
        }
      },

      dispatch () { this.$refs.file.click() },
      emit (val) {}
    },

    mounted () {
    }
  }
}

function setImgs (imgs, file) {
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = () => {
    imgs.push(reader.result)
  }
}
