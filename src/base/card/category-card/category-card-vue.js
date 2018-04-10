exports.js = () => {
  // const { VUE_SERVER } = require('config/vue-remote-server.js')
  const { QINIU_URL_PREFIX } = require('config')
  const { _2space } = require('common/js/index.js')
  return {
    name: 'category-card',
    components: {
    },

    created () {
    },

    props: {
      content: {
        type: Object,
        default: () => {}
      }
    },

    data () {
      return {
      }
    },

    computed: {
      coverImgStyle () {
        return ` background-image: url(${QINIU_URL_PREFIX}${this.content.icon}); `
      },
      cover () {
        return `${QINIU_URL_PREFIX}${this.content.icon}`
      }
    },

    watch: {
    },

    methods: {
      _2space
    },

    mounted () {
    }
  }
}
