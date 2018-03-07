exports.js = () => {
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
        menuShow: false
      }
    },

    computed: {
      categories () { return this.$store.getters.categories },
      url () { return this.$route.path }
    },

    watch: {
    },

    methods: {
      toggle () {
        console.log('in')
        this.menuShow = !this.menuShow
        this.sign = this.menuShow ? '×' : '≡'
        console.log(this.url)
      },
      go (path) {
        this.$router.push(`${path}`)
        this.toggle()
      },
      goHome () {
        this.$router.push(`/`)
        this.menuShow = false
        this.sign = '≡'
      }
    },

    mounted () {
    }
  }
}
