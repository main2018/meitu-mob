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
      cover () { return this.content[0] },
      links () {
        let links = []
        this.content.forEach((item, idx) => {
          if (idx === 0) { return }
          links.push(item)
        })
        return links
      }
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
      console.log('content: ', this.content)
    }
  }
}
