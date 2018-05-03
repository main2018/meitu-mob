exports.js = () => {
  const { getBgStyle } = require('common/js')
  return {
    name: 'swiper-thumbnail',
    components: {
    },

    created () {
    },

    props: {
      images: { type: Array, default: () => [] }
    },

    data () {
      return {
      }
    },

    computed: {
      count () { return this.images.length },
      wrapperWidthStyle () {
        let pre = 20 * this.count
        return `width: ${pre}%`
      },
      itemWidthStyle () {
        return `width: ${20}%`
      }
    },

    watch: {
    },

    methods: {
      getBgStyle
    },

    mounted () {
    }
  }
}

