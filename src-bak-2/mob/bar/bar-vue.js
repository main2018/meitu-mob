const HamburgIcon = require('base/hamburg-icon')
exports.js = () => {
  return {
    name: 'mob-bar',
    components: { HamburgIcon },

    data () {
      return {
        menuShow: false
      }
    },

    computed: {
      categories () {
        return this.$store.getters.categories.filter((item) => {
          return item.status === 0
        })
      },
      url () { return this.$route.path },
      logo () {
        let logo = this.$store.getters.settings.logo
        return logo ? this.$http + logo : ''
      }
    },

    watch: {
    },

    methods: {
      toggle () { this.menuShow = !this.menuShow },
      hideMenu () {
        this.menuShow = false
      },
      go (path) {
        this.$router.push(`${path}`)
        this.toggle()
      },
      goHome () {
        this.$router.push(`/`)
        this.menuShow = false
      },
      isHintShow (category) {
        let isCurrCateory = new RegExp(`/${category}`)
        return isCurrCateory.test(this.url)
      }
    }
  }
}
