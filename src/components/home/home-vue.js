exports.js = () => {
  const CategoryCard = require('base/card/category-card/category-card.vue')
  const { _2space } = require('common/js/index.js')
  return {
    name: 'home',
    components: {
      CategoryCard
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
      },
      _2space
    },

    mounted () {
    }
  }
}
