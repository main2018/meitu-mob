exports.js = () => {
  // const { VUE_SERVER } = require('config/vue-remote-server.js')
  const AdminAside = require('admin/aside/aside')
  const Publish = require('admin/publish/publish')
  const Card = require('base/card/card')
  return {
    name: 'admin-home',
    components: {
      AdminAside,
      Publish,
      Card
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        categories: []
      }
    },

    computed: {
      breadcrumb () {
        if (this.categories.length === 0) { return '' }
        return this.categories
                   .reduce((pre, nxt) => `${pre} / ${nxt}`)
      },
      adminAlbums () {
        return this.$store.getters.adminAlbums
      },
      isPublishShow () {
        return this.$store.getters.isPublishShow
      }
    },

    watch: {
    },

    methods: {
      getCategory (category) {
        this.categories = category
      },
      showPublish () {
        let prefix = this.isPublishShow ? 'hide' : 'show'
        this.$store.dispatch(`${prefix}Publish`)
      }
    },

    mounted () {
      this.$store.dispatch('getAlbums')
      this.$store.dispatch('getCategory')
    }
  }
}
