exports.js = () => {
  const { getBgStyle } = require('common/js')
  return {
    name: 'pc-index',
    components: {
    },

    created () {
    },

    props: {
    },

    data () {
      return {
      }
    },

    computed: {
      commendAlbums () {
        return this.$store.getters.commendAlbums
      },
      img () {
        let album = this.commendAlbums[0]
        return album ? album.img : ''
      }
    },

    watch: {
    },

    methods: {
      getBgStyle
    },

    mounted () {
      this.$store.dispatch('setSubNavMenu', '')
    }
  }
}
