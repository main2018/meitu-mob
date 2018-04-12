exports.js = () => {
  const Loading = require('base/loading/loading')
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
      Loading,
      Card
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        isContentShow: true,
        isPublishShow: true,
        isSettingsShow: false,

        cardEditable: true,
        categories: []
      }
    },

    computed: {
      loadingStatus () { return this.$store.getters.loading.status },
      loadingHint () { return this.$store.getters.loading.hint },
      isEditorShow () { return this.$store.getters.isEditorShow },
      adminAlbums () { return this.$store.getters.adminAlbums },
      breadcrumb () { return this.$store.getters.categoryCrumb },
      name () { return this.$store.getters.name }
    },

    watch: {
      isEditorShow () {
        if (this.isEditorShow) {
          this.closeAllTab(true)
        }
      }
    },

    methods: {
      getCategory (category) { this.categories = category },
      closeContent () { this.isContentShow = false },
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
      closeAllTab (exclude = false) {
        this.isContentShow = false
        this.isSettingsShow = false
        this.isPublishShow = false
        !exclude && this.$store.dispatch('hideEditor')
      }
    },

    mounted () {
      document.title = this.getLocal('siteName') + ' manager'
      this.$store.dispatch('getCategory')
    }
  }
}
