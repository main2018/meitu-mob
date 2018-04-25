exports.js = () => {
  const MobBar = require('mob/bar/bar')
  const MobInscribe = require('mob/inscribe/inscribe')
  return {
    name: 'MobHome',
    components: { MobBar, MobInscribe },

    created () {
    },

    props: {
    },

    data () {
      return {
      }
    },

    computed: {
      categories () {
        return this.$store.getters.categories.filter((item) => {
          return item.status === 0
        })
      },
      albums () { return this.$store.getters.albums }
    },

    watch: {
    },

    methods: {
      goUrl (router) { this.$router.push(`/${router}`) }
    },

    mounted () {
    }
  }
}
