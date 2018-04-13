exports.js = () => {
  const { quillEditor } = require('vue-quill-editor')
  // const { VUE_SERVER } = require('config/vue-remote-server.js')
  const { customform } = require('./form')
  const VideoPublish = require('admin/video-publish/video-publish')
  const CardInput = require('admin/card-input/card-input')
  const AdminHeader = require('admin/admin-header/admin-header')
  return {
    name: 'publish',
    components: { AdminHeader, CardInput, customform, quillEditor, VideoPublish },

    created () {
    },

    props: {
    },

    data () {
      return {
        postJson: {},
        card: {},
        num: 1
      }
    },

    computed: {
      breadcrumb () { return this.$store.getters.categoryCrumb },
      hasVideo () {
        return true
        // return this.$store.getters.hasVideo
      }
    },

    watch: {
    },

    methods: {
      closePublish () { this.$emit('close') },
      getCard (card) {
        console.log(card)
      },
      cancel () {
        this.$set(this.card, 'title', this.num++)
        this.$set(this.card, 'desc', this.num++)
      }
    },

    mounted () {
    }
  }
}
