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
        this.menus = _menus
      }
    },

    methods: {
      setStatus (idx) {
        this.menus.forEach((menu, index) => {
          menu.active = index === idx
        })
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
