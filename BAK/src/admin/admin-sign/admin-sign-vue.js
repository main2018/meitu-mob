exports.js = () => {
  const Signin = require('base/signin/signin')
  return {
    name: 'admin-sign',
    components: {
      Signin
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
      siteLogo () { return this.$store.getters.settings.logo }
    },

    watch: {
      siteLogo () {
        if (this.siteLogo) {
          this.logo = this.getLogo()
        }
      }
    },

    methods: {
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
