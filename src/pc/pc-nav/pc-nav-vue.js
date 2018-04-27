exports.js = () => {
  return {
    name: 'pc-nav',
    components: {
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        logo: ''
      }
    },

    computed: {
      categories () {
        return this.$store.getters.categories.filter((item) => {
          return item.status === 0
        })
      },
      url () { return this.$route.path },
      siteLogo () { return this.$store.getters.settings.logo }
    },

    watch: {
      siteLogo () {
        if (this.siteLogo) {
          let logo = this.getLocal('siteLogo')
          let img = this.$qiniuUrl(logo)
          this.logo = logo ? img : ''
        }
      }
    },

    methods: {
      go ({ route, category }) {
        this.$store.dispatch('setSubNavMenu', category)
        this.$router.push(`${route}`)
      }
    },

    mounted () {
    }
  }
}
