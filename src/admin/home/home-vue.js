exports.js = () => {
  const Loading = require('base/loading/loading')
  const AdminAside = require('admin/aside/aside')
  const AdminHeader = require('admin/admin-header/admin-header')
  const Publish = require('admin/publish/publish')
  const Settings = require('admin/settings/settings')
  const Card = require('base/card/show-card/card')
  const CategoryEditor = require('admin/category-editor/category-editor')
  const { sortAlbum } = require('common/js')
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
      const token = this.$store.getters.user.token
      if (!token) { this.$router.push('/admin/signin') }
    },

    props: {
    },

    data () {
      return {
        EXPIRE: 1000 * 60 * 40,
        hasExpire: null,
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
      getCategory (category) {
        this.categories = category
        this.refreshExpire()
      },
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
        this.$refs.update.id = id
        this.get(`/album/${id}`, album => {
          this.groupAndSetProps(album)
          sortAlbum(album)
        })
      },
      groupAndSetProps (album) {
        let albumGroupKey = ['videos', 'links', 'article', 'images']
        let cardKey = ['isCommend', 'title', 'cover', 'desc', 'status']
        let cardContent = {}
        for (let key in album) {
          albumGroupKey.includes(key) && (this.$refs.update[key] = album[key])
          cardKey.includes(key) && (cardContent[key] = album[key])
        }
        this.$refs.update.card = cardContent
      },
      signout () {
        this.$store.dispatch('setUser', {
          account: '',
          token: '',
          epxpire: 0
        })
        this.$router.push('/admin/signin')
      },
      testExpire () {
        this.hasExpire = setTimeout(() => {
          this.signout()
        }, this.EXPIRE)
      },
      cleanExpire () {
        this.hasExpire && clearTimeout(this.hasExpire)
      },
      refreshExpire () {
        this.cleanExpire()
        this.testExpire()
      }
    },

    mounted () {
      this.testExpire()
      const title = this.$store.getters.settings.name + ' manager'
      this.$nextTick(() => { document.title = title })
      this.$store.dispatch('getCategory')
    },
    destroyed () { this.cleanExpire() }
  }
}
