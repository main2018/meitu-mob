exports.js = () => {
  const { _2space } = require('common/js/index.js')
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
        categories: [],
        editable: true
      }
    },

    computed: {
      breadcrumb () {
        let categories = this.categories
        if (categories.length === 0) { return '' }
        let crumb = ''
        if (categories[1]) {
          crumb = categories[0] + ' / ' + categories[1]
        } else {
          crumb = categories[0]
        }
        return _2space(crumb)
      },

      adminAlbums () {
        return this.$store.getters.adminAlbums
      },
      isPublishShow () { return this.$store.getters.isPublishShow },
      isUpdatesShow () { return this.$store.getters.isUpdatesShow }
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
      },
      closeUpdates () {
        this.$store.dispatch(`hideUpdates`)
      }
    },

    mounted () {
      this.$store.dispatch('getCategory')
    }
  }
}
