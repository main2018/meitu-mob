const Card = require('pc/card/card-show-pc/card-show-pc')
exports.js = () => {
  return {
    name: 'pc-list',
    components: {
      Card
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
      path () { return this.$route.path },
      contents () { return this.$store.getters.subcategoryAlbums }
    },

    watch: {
    },

    methods: {
    },

    mounted () {
      console.log(this.path)
    }
  }
}
