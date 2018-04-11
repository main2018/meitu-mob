exports.js = () => {
  const AdminAside = require('admin/aside/aside')
  const AdminHeader = require('admin/admin-header/admin-header')
  const Publish = require('admin/publish/publish')
  const Settings = require('admin/settings/settings')
  const Card = require('base/card/card')
  const CategoryEditor = require('admin/category-editor/category-editor')
  return {
    name: 'admin-home',
    components: {
      CategoryEditor,
      AdminHeader,
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
        isContentShow: true,
        isPublishShow: false,
        isSettingsShow: false,

        cardEditable: true,
        categories: []
      }
    },

    computed: {
      isEditorShow () { return this.$store.getters.isEditorShow },
      adminAlbums () { return this.$store.getters.adminAlbums },
      breadcrumb () { return this.$store.getters.categoryCrumb },
      name () { return this.$store.getters.name }
    },

    watch: {
    },

    methods: {
      getCategory (category) { this.categories = category },
      showPublish () { this.openTab('Publish') },
      closePublish () { this.closeTab() },
      openSettings () { this.openTab('Settings') },
      closeSettings () { this.closeTab() },
      openEditor () { this.openTab('Editor') },
      closeEditor () { this.closeTab() },

      closeTab () {
        this.closeAllTab()
        this.isContentShow = true
      },
      openTab (item) {
        this.closeAllTab()
        this[`is${item}Show`] = true
      },
      closeAllTab () {
        this.isContentShow = false
        this.isSettingsShow = false
        this.isPublishShow = false
        this.$store.dispatch('hideEditor')
      }
    },

    mounted () {
      document.title = this.getLocal('siteName') + ' manager'
      this.$store.dispatch('getCategory')
    }
  }
}
