const HamburgIcon = require('base/hamburg-icon')
exports.js = () => {
  return {
    name: 'mob-bar',
    components: { HamburgIcon },

    data () {
      return {
        menuShow: false,
        logo: ''
      }
    },

    computed: {
      categories () {
        return this.$store.getters.categories.filter((item) => {
          return item.status === 0
        })
      },
      url () { return this.$route.path },
      siteLogo () { return this.$store.getters.settings.logo }
    },

    watch: {
      siteLogo () {
        if (this.siteLogo) {
          let logo = this.getLocal('siteLogo')
          let img = this.$qiniuUrl(logo)
          this.logo = logo ? img : ''
        }
      }
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
