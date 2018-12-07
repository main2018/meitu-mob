exports.js = () => {
  const { quillEditor } = require('vue-quill-editor')
  const TinyEditor = require('base/tiny-editor')
  const SubPublish = require('admin/sub-publish/sub-publish')
  const CardInput = require('admin/card-input/card-input')
  const AdminHeader = require('admin/admin-header/admin-header')
  return {
    name: 'publish',
    components: { AdminHeader, CardInput, TinyEditor, quillEditor, SubPublish },

    created () {
    },

    props: {
      isNew: { type: Boolean, default: true }
    },

    data () {
      return {
        id: '',
        card: {},
        article: '',
        images: [],
        videos: [],
        links: []
      }
    },

    computed: {
      compTitle () { return this.isNew ? 'Publisher' : 'Updater' },
      breadcrumb () { return this.$store.getters.categoryCrumb },
      isSubpage () { return this.$store.getters.isSubpage },
      hasArticle () { return this.$store.getters.hasArticle },
      hasImage () { return this.$store.getters.hasImage },
      hasVideo () { return this.$store.getters.hasVideo },
      hasLink () { return this.$store.getters.hasLink },
      category () { return this.$store.getters.activeCategory }
    },

    watch: {
    },

    methods: {
      submit () {
        let path = this.isNew ? 'add' : `update`
        this.post(`/album/${path}`, this.getAlbum(), () => {
          this.clean()
          this.refreshAlbum()
          this.$emit('close')
        })
      },
      refreshAlbum () {
        this.$store.dispatch('getAdminAlbums', {
          category: this.category[0],
          subcategory: this.category[1]
        })
      },
      getAlbum () {
        let { hasArticle, hasImage, hasVideo, hasLink } = this
        let album = { id: this.id, category: this.category[0] }
        this.category[1] && (album.subcategory = this.category[1])
        hasArticle && (album.article = this.article)
        hasImage && (album.images = this.images)
        hasVideo && (album.videos = this.videos)
        hasLink && (album.links = this.links)
        for (let key in this.card) { album[key] = this.card[key] }
        return album
      },
      clean () {
        this.article = ''
        this.$refs.card.clean()
        this.$refs.video.clean()
        this.$refs.link.clean()
        this.$refs.image.clean()
      },
      close () {
        this.clean()
        this.$emit('close')
      },
      getCard (card) { this.card = card },
      getLinks (links) { this.links = links },
      getImages (images) { this.images = images },
      getVideos (videos) { this.videos = videos }
    },

    mounted () {
      // this.$set(this, 'videos', mock)
      // this.$set(this, 'links', mock2)
    }
  }
}
