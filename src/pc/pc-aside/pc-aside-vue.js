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
      siteLogo () { return this.$store.getters.settings.logo }
    },

    watch: {
    },

    methods: {
      setStatus (idx, _idx) {
        let subcategory = this.menus[idx].subcategories[_idx].name
        let { category, route } = this.menus[idx]
        // this.$store.dispatch('setStatus', [idx, _idx])
        this.$store.dispatch('setSubategoryAlbums', [category, subcategory, idx, _idx])
        this.$store.dispatch('setSubNavMenu', category)
        this.$router.push(`/${route}`)
      },
      getLogo () {
        let logo = this.getLocal('siteLogo')
        logo = logo ? this.$qiniuUrl(logo) : ''
        return logo
      },
      goHome () {
        this.$store.dispatch('setSubategoryAlbums', ['one', 'bb'])
        this.$store.dispatch('setSubNavMenu')
        this.$router.push('/')
      }
    },

    mounted () {
    }
  }
}
