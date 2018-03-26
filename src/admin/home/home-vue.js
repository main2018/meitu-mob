exports.js = () => {
  const { _2space } = require('common/js/index.js')
  const AdminAside = require('admin/aside/aside')
  const Publish = require('admin/publish/publish')
  const Settings = require('admin/settings/settings')
  const Card = require('base/card/card')
  return {
    name: 'admin-home',
    components: {
      AdminAside,
      Settings,
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
        editable: true,
        isSettingsShow: false
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
      name () { return this.$store.getters.name },
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
      },
      closeSettings () { this.isSettingsShow = false },
      openSettings () { this.isSettingsShow = true }
    },

    mounted () {
      document.title = this.getLocal('siteName') + ' manager'
      this.$store.dispatch('getCategory')
    }
  }
}
