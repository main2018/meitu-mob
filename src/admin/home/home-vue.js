exports.js = () => {
  const Loading = require('base/loading/loading')
  const AdminAside = require('admin/aside/aside')
  const AdminHeader = require('admin/admin-header/admin-header')
  const Publish = require('admin/publish/publish')
  const Settings = require('admin/settings/settings')
  const Card = require('base/card/show-card/card')
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
      let isSignin = !!this.getLocal('token')
      if (!isSignin) { this.$router.push('/admin/signin') }
    },

    props: {
    },

    data () {
      return {
        isPublish: true,
        isContentShow: true,
        isPublishShow: false,
        isSettingsShow: false,
        cardEditable: true,
        categories: []
      }
    },

    computed: {
      route () { return this.$route.path },
      loadingStatus () { return this.$store.getters.loading.status },
      loadingHint () { return this.$store.getters.loading.hint },
      isEditorShow () { return this.$store.getters.isEditorShow },
      adminAlbums () { return this.$store.getters.adminAlbums },
      breadcrumb () { return this.$store.getters.categoryCrumb },
      name () { return this.$store.getters.name }
    },

    watch: {
      isEditorShow () {
        this.isEditorShow && this.closeAllTab(true)
      }
    },

    methods: {
      getCategory (category) { this.categories = category },
      closeContent () { this.isContentShow = false },
      showPublish () {
        this.isPublish = true
        this.openTab('Publish')
      },
      resetPublish (id) { this.editCard(id) },
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
      },
      editCard (id) {
        this.showPublish()
        this.isPublish = false
        let groupKey = ['videos', 'links', 'article']
        let cardKey = ['title', 'cover', 'desc', 'status']
        let card = {}
        this.$refs.update.id = id
        this.get(`/album/${id}`, resp => {
          let album = resp
          for (let key in album) {
            groupKey.includes(key) && (this.$refs.update[key] = album[key])
            cardKey.includes(key) && (card[key] = album[key])
          }
          this.$refs.update.card = card
        })
      }
    },

    mounted () {
      let title = this.getLocal('siteName') + ' manager'
      this.$nextTick(() => { document.title = title })
      this.$store.dispatch('getCategory')
    }
  }
}
