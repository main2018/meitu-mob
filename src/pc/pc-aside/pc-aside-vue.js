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
      menus () { return this.$store.getters.subNavMenu },
      siteLogo () { return this.$store.getters.settings.logo }
    },

    watch: {
    },

    methods: {
      setStatus (idx, _idx) {
        this.$store.dispatch('setStatus', [idx, _idx])
        let navItem = this.menus[idx].subcategories[_idx].name
        this.$store.dispatch('setSubNavActive', navItem)
      },
      getLogo () {
        let logo = this.getLocal('siteLogo')
        logo = logo ? this.$qiniuUrl(logo) : ''
        return logo
      },
      goHome () {
        this.$store.dispatch('setSubNavMenu')
        this.$router.push('/')
      }
    },

    mounted () {
    }
  }
}
