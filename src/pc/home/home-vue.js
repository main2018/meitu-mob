exports.js = () => {
  const PcNav = require('pc/pc-nav/pc-nav')
  const PcAside = require('pc/pc-aside/pc-aside')
  return {
    name: 'home-vue',
    components: {
      PcNav, PcAside
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
      isCategoryEven () {
        let categoryCount = this.$store.getters.categories.length
        return categoryCount % 2 === 0
      },
      bgStyle () {
        let ltColor = 'rgb(246, 247, 255)'
        let dkColor = '#333'
        let param = `to right, ${dkColor} 50%, ${ltColor} 50%`
        let style = ''
        if (!this.isCategoryEven) {
          style = `background: linear-gradient(${param});`
        } else {
          style = `background-color: ${dkColor}`
        }
        return style
      }
    },

    watch: {
    },

    methods: {
    },

    mounted () {
      document.body.style.backgroundColor = '#333'
    }
  }
}
