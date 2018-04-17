exports.js = () => {
  // const { VUE_SERVER } = require('config/vue-remote-server.js')
  const { QINIU_URL_PREFIX } = require('config')
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
        http: QINIU_URL_PREFIX
      }
    },

    computed: {
      coverImgStyle () {
        let url = this.content.icon ? this.http + this.content.icon : ''
        return `
        background-color: #eee;
        background-image: url(${url});
        `
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
