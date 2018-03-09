exports.js = () => {
  return {
    name: 'img-upload',
    components: {
    },

    created () {
    },

    props: {
      multilple: {
        type: Boolean,
        default: false
      },
      show: {
        type: Boolean,
        default: true
      }
    },

    data () {
      return {
        imgs: []
      }
    },

    computed: {
    },

    watch: {
    },

    methods: {
      getFiles (event) {
        let method = this.multilple ? 'getImgs' : 'getImg'
        this[method](event)
        this.emit(event)
      },

      getImg (event) {
        this.file = event.target.files[0]
        if (!this.file || !window.FileReader) return
        if (!/^image/.test(this.file.type)) return
        setImgs(this.imgs, this.file)
      },

      getImgs (event) {
        this.files = event.target.files
        if (!this.files || !window.FileReader) return
        for (let i = 0; i < this.files.length; i++) {
          if (!/^image/.test(this.files[i].type)) { continue }
          setImgs(this.imgs, this.files[i])
        }
      },

      dispatch () { this.$refs.file.click() },
      emit (val) { this.$emit('change', event) }
    },

    mounted () {
    }
  }
}

function setImgs (imgs, file) {
  this.imgs = []
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = () => {
    imgs.push(reader.result)
  }
}
