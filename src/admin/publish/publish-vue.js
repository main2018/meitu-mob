exports.js = () => {
  const { quillEditor } = require('vue-quill-editor')
  // const { VUE_SERVER } = require('config/vue-remote-server.js')
  const { customform } = require('./form')
  const SubPublish = require('admin/sub-publish/sub-publish')
  const CardInput = require('admin/card-input/card-input')
  const AdminHeader = require('admin/admin-header/admin-header')
  return {
    name: 'publish',
    components: { AdminHeader, CardInput, customform, quillEditor, SubPublish },

    created () {
    },

    props: {
    },

    data () {
      return {
        postJson: {},
        card: {},
        num: 1,
        album: {
          videos: [ { } ]
        }
      }
    },

    computed: {
      breadcrumb () { return this.$store.getters.categoryCrumb },
      hasVideo () {
        return true
        // return this.$store.getters.hasVideo
      },
      hasLink () {
        return true
        // return this.$store.getters.hasLink
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
      },
      getSub (sub) {
        console.log({ sub })
      }
    },

    mounted () {
      this.$set(this.album, 'videos', mock)
      // this.$refs.link.contents_ = mock
    }
  }
}

let mock = [
  {
    file: 'VV1ytHWOhR.mp4',
    url: '//u.u',
    text: 'heah',
    order: 10
  },
  {
    file: 'pDtRpFnVnJ.mp4',
    url: '//2u.u',
    text: 'heah',
    order: 10
  },
  {
    file: 'VV1ytHWOhR.mp4',
    url: '//3u.u',
    text: 'asdfdsfheah',
    order: 10
  }
]
