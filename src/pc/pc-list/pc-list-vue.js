const Card = require('pc/card/card-show-pc/card-show-pc')
const Swiper = require('base/swiper/swiper')
const { _2space, getBgStyle } = require('common/js')
exports.js = () => {
  return {
    name: 'pc-list',
    components: { Swiper, Card },

    created () {
    },

    props: {
    },

    data () {
      return {
      }
    },

    computed: {
      albums () { return this.$store.getters.albums },
      activeSubNavMenu () { return this.$store.getters.activeSubNavMenu },
      isInSubHome () { return !!this.activeSubNavMenu.subcategory },

      currCategory () { return _2space(this.$route.path) },
      contents () { return this.$store.getters.subcategoryAlbums },
      coverStyle () {
        let img = ''
        let categories = this.$store.getters.categories
        categories.forEach(item => {
          if (`/${item.category}` === this.currCategory) {
            img = item.icon
          }
        })
        return getBgStyle(img)
      },
      route () {
        return this.$route.path
      },
      imgs () {
        let imgs = []
        let categories = this.$store.getters.categories
        categories.forEach(item => {
          let isCurrRoute = `/${item.route}` !== this.route
          if (isCurrRoute) { return }
          imgs.push({ src: item.icon })
        })
        return imgs
      }
    },

    watch: {
    },

    methods: {
    },

    mounted () {
    }
  }
}
