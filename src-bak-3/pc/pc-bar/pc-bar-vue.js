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
        keyword: ''
      }
    },

    computed: {
      logo () {
        let logo = this.$store.getters.settings.logo
        return logo ? this.$http + logo : ''
      }
    },

    watch: {
    },

    methods: {
    },

    mounted () {
    }
  }
}
