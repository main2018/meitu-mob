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
        menuShow: true
      }
    },

    computed: {
    },

    watch: {
    },

    methods: {
      toogle () {
        this.menuShow = !this.menuShow
        this.sign = this.menuShow ? '×' : '≡'
      }
    },

    mounted () {
    }
  }
}
