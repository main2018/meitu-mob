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
          let uris = this.getAlbumUri(resp.data)
          uris.forEach(uri => { qiniuDel(uri) })
          this.post('/album/del', {id: this.content.id}, resp => {
            if (!resp.success) { return }
            this.refreshAlbum()
          })
        })
      },
      refreshAlbum () {
        this.$store.dispatch('getAdminAlbums', {
          category: this.activeCategory[0],
          subcategory: this.activeCategory[1]
        })
      },
      getAlbumUri (album) {
        let uris = []
        album.cover && uris.push(album.cover)
        album.videos.forEach((video) => {
          video.uri && uris.push(video.uri)
        })
        album.links.forEach((link) => {
          link.uri && uris.push(link.uri)
        })
        return uris
      },
      goDetail () {
        let { id } = this.content
        this.$store.dispatch('getCurrAlbum', id)
        if (!this.content.id) { return alert('no detail') }
        if (this.editable) {
          return this.$emit('edit', id)
        }
        this.$router.push({
          path: `${this.url}/detail`,
          query: { id }
        })
      },
      toggleStatus () {
        let _id = this.content.id
        let status = 0
        if (this.content.status === 0) {
          status = 1
          this.$set(this.content, 'status', 1)
        } else if (this.content.status === 1) {
          status = 0
          this.$set(this.content, 'status', 0)
        }
        this.post('/album/set', { _id, status })
      }
    },

    mounted () {
    }

  }
}
