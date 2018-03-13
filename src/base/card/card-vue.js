exports.js = () => {
  const { timeFormat } = require('common/js')
  const { VUE_SERVER } = require('config/vue-remote-server.js')
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
      isUpdatesShow () {
        return this.$store.getters.isUpdatesShow
      },
      coverImgStyle () {
        return `
        padding-bottom: 65%;
        background-color: #eee;
        background-image: url(${VUE_SERVER}${this.content.img});
        `
      }
    },

    watch: {
    },

    methods: {
      timeFormat,
      del () {
        this.post('/album/del', {id: this.content.id})
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
        this.$router.push({ path: '/__detail', query: { id: this.content.id } })
      }
    },

    mounted () {
    }

  }
}
