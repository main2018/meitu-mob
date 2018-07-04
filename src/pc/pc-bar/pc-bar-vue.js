exports.js = () => {
  const PcNav = require('pc/pc-nav/pc-nav')
  return {
    name: 'pc-bar',
    components: {
      PcNav
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        logo: '',
        keyword: ''
      }
    },

    computed: {
      isPcBarShow () { return this.$route.path !== '/admin' },
      siteLogo () { return this.$store.getters.settings.logo }
    },

    watch: {
      siteLogo () {
        console.log(this.logo)
        if (this.siteLogo) {
          let logo = this.getLocal('siteLogo')
          let img = this.$qiniuUrl(logo)
          this.logo = logo ? img : ''
        }
      }
    },

    methods: {
    },

    mounted () {
    }
  }
}
