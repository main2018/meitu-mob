exports.js = () => {
  const CategoryCard = require('base/card/category-card/category-card.vue')
  return {
    inject: ['hideMenu'],
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
          return item.status === 0 && !item.isSubpage
        })
      },
      albums () { return this.$store.getters.albums }
    },

    watch: {
    },

    methods: {
      goUrl (router) {
        this.hideMenu()
        this.$router.push(`/${router}`)
      }
    },

    mounted () {
    }
  }
}
