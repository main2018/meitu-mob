exports.js = () => {
  const { quillEditor } = require('vue-quill-editor')
  const { VUE_SERVER } = require('config/vue-remote-server.js')
  const { customform } = require('./form')
  let json = {
    status: 0,
    files: [],
    title: '',
    desc: '',
    hasVideo: false,
    content: ''
  }
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
        postJson: json
      }
    },
    computed: {
      breadcrumb () {
        if (this.crumb.length === 0) { return '' }
        return this.crumb.reduce((pre, nxt) => {
          return `${pre} / ${nxt}`
        })
      },
      isPublishShow () { return this.$store.getters.isPublishShow },
      isUpdatesShow () { return this.$store.getters.isUpdatesShow },
      currAlbum () { return this.$store.getters.currAlbum }
    },

    watch: {
      currAlbum () {
        if (this.isUpdatesShow) {
          this.postJson = this.genPostJson()
        }
      },
      isUpdatesShow () {
        if (!this.isUpdatesShow) { this.reset() }
      },
      isPublishShow () {
        if (!this.isPublishShow) { this.reset() }
      }
    },

    methods: {
      getFiles (event) {
        let files = event.target.files
        this.postJson.files.push({ coverimg: files })
        let reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onloadend = () => {
          this.coverStyle = `background-image: url(${reader.result});`
        }
      },
      genPostJson () {
        let album = this.currAlbum
        let {status, title, desc, content, hasVideo} = album
        let postJson = {status, title, desc, content, hasVideo}
        postJson.files = []
        postJson.category = album.category.category
        this.coverStyle = `background-image: url(${VUE_SERVER}${album.coverimg});`
        return postJson
      },
      addCategory () {
        this.postJson.category = this.crumb[0]
        if (this.crumb[1]) {
          this.postJson.subcategory = this.crumb[1]
        }
      },
      validate () {
        return !this.postJson.title && !this.postJson.desc
      },
      reset () {
        this.postJson = json
        this.coverStyle = ''
      },
      updatesReset () {
        this.postJson = this.genPostJson()
      },
      publish () {
        if (this.validate) {
          alert('info not complete')
          return
        }
        this.addCategory()
        this.postForm('/album/add', this.postJson, () => {
          this.reset()
          this.$store.dispatch('hidePublish')
          this.refreshAlbum()
          alert('publish success')
        })
      },
      update () {
        if (this.validate) {
          alert('info not complete')
          return
        }
        this.addCategory()
        this.postJson._id = this.currAlbum._id
        this.postForm('/album/update', this.postJson, () => {
          this.postJson = this.genPostJson()
          this.updatesReset()
          this.$store.dispatch('hideUpdates')
          this.refreshAlbum()
          alert('update success')
        })
      },
      refreshAlbum () {
        this.$store.dispatch('getAdminAlbums', {
          category: this.crumb[0],
          subcategory: this.crumb[1]
        })
      },
      dispatch () { this.$refs.file.click() },
      test () { console.log(this.postJson) }
    },

    mounted () {
    }
  }
}
