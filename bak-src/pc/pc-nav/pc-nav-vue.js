exports.js = () => {
  return {
    name: 'pc-nav',
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
      categories () {
        return this.$store.getters.categories.filter((item) => {
          return item.status === 0
        })
      },
      url () { return this.$route.path }
    },

    watch: {
    },

    methods: {
      isHintShow (category) {
        let isCurrCateory = new RegExp(`/${category}`)
        return isCurrCateory.test(this.url)
      }
    },

    mounted () {
    }
  }
}
