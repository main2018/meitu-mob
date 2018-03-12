exports.js = () => {
  const { quillEditor } = require('vue-quill-editor')
  const { customform } = require('./form')
  return {
    name: 'publish',
    components: { customform, quillEditor },

    props: {
      crumb: {
        type: Array,
        default: () => []
      }
    },

    data () {
      return {
        coverStyle: '',
        postJson: this.genPostJson()
      }
    },

    computed: {
      breadcrumb () {
        if (this.crumb.length === 0) { return '' }
        return this.crumb.reduce((pre, nxt) => {
          return `${pre} / ${nxt}`
        })
      }
    },

    methods: {
      getFiles (event) {
        let files = event.target.files
        this.postJson.files.push({ coverimg: files })
        let reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onloadend = () => {
          this.coverStyle = `
            background-image: url(${reader.result});
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
          `
        }
      },
      genPostJson () {
        return {
          status: 0,
          files: [],
          title: '',
          desc: '',
          hasVideo: false,
          content: ''
        }
      },
      addCategory () {
        this.postJson.category = this.crumb[0]
        if (this.crumb[1]) {
          this.postJson.subcategory = this.crumb[1]
        }
      },
      validate () {
        return this.postJson.title && this.postJson.desc
      },
      reset () {
        this.postJson = this.genPostJson()
        this.coverStyle = ''
      },
      publish () {
        if (!this.validate) {
          alert('info not complete')
          return
        }
        this.addCategory()
        this.postForm('/album/add', this.postJson, () => {
          this.reset()
          this.$store.dispatch('hidePublish')
          this.$store.dispatch('getAdminAlbums', this.$store.getters.activeCategory)
          alert('publish success')
        })
      },
      dispatch () { this.$refs.file.click() },
      test () { console.log(this.postJson) }
    },

    mounted () {
    }
  }
}
