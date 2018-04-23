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
        logo: ''
      }
    },

    computed: {
      siteLogo () { return this.$store.getters.settings.logo }
    },

    watch: {
      siteLogo () {
        if (this.siteLogo) {
          let logo = this.getLocal('siteLogo')
          this.logo = logo ? this.$qiniuUrl(logo) : ''
        }
      }
    },

    methods: {
    },

    mounted () {
    }
  }
}
