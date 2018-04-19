exports.js = () => {
  const { QINIU_URL_PREFIX } = require('config')
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
          let img = `${QINIU_URL_PREFIX}${logo}`
          this.logo = logo ? img : ''
        }
      }
    },

    methods: {
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
    }
  }
}
