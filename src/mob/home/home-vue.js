exports.js = () => {
  const CategoryCard = require('base/card/category-card/category-card.vue')
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
