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
        menus: [],
        logo: this.getLogo() || ''
      }
    },

    computed: {
      _menus () { return this.$store.getters.subNavMenu },
      siteLogo () { return this.$store.getters.settings.logo }
    },

    watch: {
      _menus () {
        let _menus = []
        this._menus.forEach(name => {
          let menu = { name, active: false }
          _menus.push(menu)
        })
        // if (_menus[0]) { _menus[0].active = true }
        this.menus = _menus
      }
    },

    methods: {
      setStatus (idx) {
        this.menus.forEach((menu, index) => {
          menu.active = index === idx
        })
        let navItem = this._menus[idx]
        this.$store.dispatch('setSubNavActive', navItem)
      },
      getLogo () {
        let logo = this.getLocal('siteLogo')
        logo = logo ? this.$qiniuUrl(logo) : ''
        return logo
      }
    },

    mounted () {
    }
  }
}
