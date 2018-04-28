const Card = require('pc/card/card-show-pc/card-show-pc')
const { _2space, getBgStyle } = require('common/js')
exports.js = () => {
  return {
    name: 'pc-list',
    components: {
      Card
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
      currCategory () { return _2space(this.$route.path) },
      contents () { return this.$store.getters.subcategoryAlbums },
      coverStyle () {
        console.log(this.currCategory)
        let img = ''
        let categories = this.$store.getters.categories
        categories.forEach(item => {
          console.log(item.category)
          if (`/${item.category}` === this.currCategory) {
            img = item.icon
          }
        })
        console.log(getBgStyle(img))
        return getBgStyle(img)
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
