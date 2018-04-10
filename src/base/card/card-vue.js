exports.js = () => {
  const { timeFormat } = require('common/js')
  const { QINIU_URL_PREFIX } = require('config')
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
      coverImgStyle () {
        let url = this.content.img ? QINIU_URL_PREFIX + this.content.img : ''
        return `
        padding-bottom: 65%;
        background-color: #eee;
        background-image: url(${url})
        `
      },
      activeCategory () {
        return this.$store.getters.activeCategory
      }
    },

    watch: {
    },

    methods: {
      timeFormat,
      del () {
        this.post('/album/del', {id: this.content.id})
        this.$store.dispatch('getAdminAlbums', {
          category: this.activeCategory[0],
          subcategory: this.activeCategory[1]
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
