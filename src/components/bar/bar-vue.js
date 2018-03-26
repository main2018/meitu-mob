exports.js = () => {
  const { _2space } = require('common/js/index.js')
  return {
    name: 'bar',
    components: {
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        sign: '≡',
        menuShow: false,
        logo: this.getLocal('siteLogo')
      }
    },

    computed: {
      categories () { return this.$store.getters.categories },
      url () { return this.$route.path }
    },

    watch: {
    },

    methods: {
      _2space,
      toggle () {
        this.menuShow = !this.menuShow
        this.sign = this.menuShow ? '×' : '≡'
      },
      go (path) {
        this.$router.push(`${path}`)
        this.toggle()
      },
      goHome () {
        this.$router.push(`/`)
        this.menuShow = false
        this.sign = '≡'
      },
      isHintShow (category) {
        let isCurrCateory = new RegExp(`/${category}`)
        return isCurrCateory.test(this.url)
      }
    },

    mounted () {
      console.log(this.logo)
    }
  }
}
