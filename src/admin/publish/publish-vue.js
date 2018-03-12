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
        postJson: {
          status: 0,
          files: [],
          title: '',
          desc: '',
          hasVideo: false,
          content: ''
        }
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
        let file = files[0]
        this.postJson.files.push({
          images: event.target.files
        })
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          this.coverStyle = `
            background-image: url(${reader.result});
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
          `
          // this.postJson.cover = reader.result
          // imgs.push(reader.result)
        }
      },
      getPostJson () {

      },
      reset () {
        console.log(this.postJson)
      },
      publish () {
        if (!this.postJson.title && !this.postJson.desc) { return }
        this.postForm('/album/add', this.postJson, (resp) => {
          console.log(resp)
        })
      },
      dispatch () { this.$refs.file.click() },
      test () { console.log(this.postJson) }
    },

    mounted () {
    }
  }
}
