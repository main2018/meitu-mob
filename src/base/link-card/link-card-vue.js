exports.js = () => {
  const { getBgStyle } = require('common/js')
  return {
    name: 'link-card',
    components: {
    },

    created () {
    },

    props: {
      content: {
        type: Array,
        default: () => []
      }
    },

    data () {
      return {
      }
    },

    computed: {
      cover () { return this.content.shift() },
      links () { return this.content }
    },

    watch: {
    },

    methods: {
      getBgStyle,
      go (url) {
        if (!url) { return }
        if (!/^http[s]+/g.test(url)) { url = 'http://' + url }
        /* eslint-disable no-indent */
        location.href = url
      }
    },

    mounted () {
    }
  }
}
