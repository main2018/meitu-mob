exports.js = () => {
  const { qiniuDel } = require('common/js/qiniu-api.js')
  const { timeFormat } = require('common/js')
  const { getBgStyle } = require('common/js')
  return {
    name: 'card',
    components: {
    },

    props: {
      content: {
        type: Object,
        default: () => {}
      },
      editable: {
        type: Boolean,
        default: false
      },
      btn: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
      }
    },

    computed: {
      url () { return this.$route.path },
      isUpdatesShow () {
        return this.$store.getters.isUpdatesShow
      },
      activeCategory () {
        return this.$store.getters.activeCategory
      }
    },

    watch: {
    },

    methods: {
      getBgStyle,
      timeFormat,
      del () {
        this.get(`/album/${this.content.id}`, resp => {
          this.delQiniuUri(resp.data)
          this.post('/album/del', {id: this.content.id})
        })
        this.$store.dispatch('getAdminAlbums', {
          category: this.activeCategory[0],
          subcategory: this.activeCategory[1]
        })
      },
      delQiniuUri (album) {
        album.cover && qiniuDel(album.cover)
        album.videos.forEach((video) => {
          video.uri && qiniuDel(video.uri)
        })
        album.links.forEach((link) => {
          link.uri && qiniuDel(link.uri)
        })
      },
      goDetail () {
        this.$store.dispatch('getCurrAlbum', this.content.id)
        if (!this.content.id) {
          alert('no detail')
          return
        }
        if (this.editable) {
          let prefix = this.isUpdatesShow ? 'hide' : 'show'
          this.$store.dispatch(`${prefix}Updates`)
          return
        }
        this.$router.push({ path: `${this.url}/detail`, query: { id: this.content.id } })
      }
    },

    mounted () {
    }

  }
}
