exports.js = () => {
  return {
    name: 'home',
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
      categories () { return this.$store.getters.categories },
      albums () { return this.$store.getters.albums }
    },

    watch: {
    },

    methods: {
      goUrl (router) {
        this.$router.push(`/${router}`)
      }
    },

    mounted () {
      this.$store.dispatch('getAllAlbum')
    }
  }
}
