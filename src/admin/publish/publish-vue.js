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
        card: {},
        videos: [],
        links: []
      }
    },

    computed: {
      breadcrumb () { return this.$store.getters.categoryCrumb },
      hasVideo () { return this.$store.getters.hasVideo },
      hasLink () { return this.$store.getters.hasLink },
      category () { return this.$store.getters.activeCategory }
    },

    watch: {
    },

    methods: {
      closePublish () { this.$emit('close') },
      submit () {
        let album = { category: this.category[0] }
        this.category[1] && (album.subcategory = this.category[1])
        for (let key in this.card) { album[key] = this.card[key] }
        album.videos = this.videos
        album.links = this.links
        console.log(album)
        this.post('/album/add', album, (resp) => {
          console.log(resp)
        })
      },
      clean () {
        this.$refs.card.clean()
        this.$refs.video.clean()
        this.$refs.link.clean()
      },
      getCard (card) {
        this.card = card
      },
      getLinks (links) {
        this.links = links
      },
      getVideos (videos) {
        this.videos = videos
      }
    },

    mounted () {
      // this.$set(this, 'videos', mock)
      // this.$set(this, 'links', mock2)
    }
  }
}

/*
let mock = [
  {
    uri: 'VV1ytHWOhR.mp4',
    url: '//u.u',
    text: 'heah',
    order: 10
  },
  {
    uri: 'pDtRpFnVnJ.mp4',
    url: '//2u.u',
    text: 'heah',
    order: 10
  },
  {
    uri: 'VV1ytHWOhR.mp4',
    url: '//3u.u',
    text: 'asdfdsfheah',
    order: 10
  }
]

let mock2 = [
  {
    uri: 'VV1ytHWOhR.mp4',
    url: '//u.u',
    text: 'heah',
    order: 10
  },
  {
    uri: 'pDtRpFnVnJ.mp4',
    url: '//2u.u',
    text: 'heah',
    order: 10
  },
  {
    uri: 'VV1ytHWOhR.mp4',
    url: '//3u.u',
    text: 'asdfdsfheah',
    order: 10
  }
]
*/
