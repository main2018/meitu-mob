exports.js = () => {
  return {
    name: 'pc-aside',
    components: {
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        logo: this.getLogo() || ''
      }
    },

    computed: {
      path () { return this.$route.path },
      menus () { return this.$store.getters.subNavMenu },
      siteLogo () { return this.$store.getters.settings.logo },
      activeSubNavMenu () { return this.$store.getters.activeSubNavMenu }
    },

    watch: {
    },

    methods: {
      getLogo () {
        let logo = this.getLocal('siteLogo')
        return logo ? this.$qiniuUrl(logo) : ''
      },
      isActive (item, sub) {
        let { category, subcategory } = this.activeSubNavMenu
        return item === category && sub === subcategory
      },
      go (idx, _idx) {
        let subcategory = this.menus[idx].subcategories[_idx].name
        let { category, route } = this.menus[idx]
        this.$store.dispatch('setSubategoryAlbums', [category, subcategory, idx, _idx])
        this.$store.dispatch('setSubNavActive', { category, subcategory })
        this.$store.dispatch('setSubNavMenu', category)
        this.$router.push(`/${route}`)
      },
      goHome () {
        this.$store.dispatch('setSubategoryAlbums', ['one', 'bb'])
        this.$store.dispatch('setSubNavMenu')
        this.$store.dispatch('clearSubNavActive')
        this.$router.push('/')
      }
    },

    mounted () {
    }
  }
}
