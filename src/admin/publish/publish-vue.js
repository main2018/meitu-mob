exports.js = () => {
  const { quillEditor } = require('vue-quill-editor')
  const { VUE_SERVER } = require('config/vue-remote-server.js')
  const { customform } = require('./form')
  const VideoPublish = require('admin/video-publish/video-publish')
  let json = {
    status: 0,
    files: [],
    title: '',
    desc: '',
    content: ''
  }
  return {
    name: 'publish',
    components: { customform, quillEditor, VideoPublish },

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
      currAlbum () { return this.$store.getters.currAlbum },
      hasArticle () { return this.$store.getters.hasArticle },
      hasVideo () { return this.$store.getters.hasVideo },
      hasLink () { return this.$store.getters.hasLink }
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
        if (!this.postJson.title && !this.postJson.desc) {
          alert('info not complete')
          return
        }
        this.postJson.hasArticle = this.hasArticle
        this.postJson.hasVideo = this.hasVideo
        this.postJson.hasLink = this.hasLink

        this.addCategory()
        this.post('/album/add', this.postJson, () => {
          this.reset()
          this.$store.dispatch('hidePublish')
          this.refreshAlbum()
          alert('publish success')
        })
        /*
        console.log(this.postJson)
        */
      },
      update () {
        if (!this.postJson.title && !this.postJson.desc) {
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
      getVideos (videos) {
        this.clearVideos()
        videos.forEach((item, idx) => {
          // add video file
          let video = {}
          let videoCover = {}
          video[`videos${idx}_video`] = item.video
          videoCover[`videos${idx}_cover`] = item.cover
          this.postJson.files.push(video)
          this.postJson.files.push(videoCover)
          // add video infos
          this.postJson[`videos${idx}_order`] = item.order
          this.postJson[`videos${idx}_text`] = item.text
          this.postJson[`videos${idx}_url`] = item.url
        })
      },

      getLinks (links) {
        this.clearVideos()
        links.forEach((item, idx) => {
          // add link file
          let link = {}
          let linkCover = {}
          link[`links{idx}_video`] = item.video
          linkCover[`links{idx}_cover`] = item.cover
          this.postJson.files.push(link)
          this.postJson.files.push(linkCover)
          // add link infos
          this.postJson[`links{idx}_order`] = item.order
          this.postJson[`links{idx}_text`] = item.text
          this.postJson[`links{idx}_url`] = item.url
        })
      },

      clearVideos () {
        this.postJson.files = this.postJson.files.filter(file => {
          return file.hasOwnProperty('coverimg')
        })
      },
      dispatch () { this.$refs.file.click() },
      test () { console.log(this.postJson) }
    },

    mounted () {
    }
  }
}
