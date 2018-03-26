exports.js = () => {
  const { VUE_SERVER } = require('config/vue-remote-server.js')
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
        return ` background-image: url(${VUE_SERVER}${this.content.icon}); `
      },
      cover () {
        return `${VUE_SERVER}${this.content.icon}`
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
