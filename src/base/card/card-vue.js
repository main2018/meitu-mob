exports.js = () => {
  const { VUE_SERVER } = require('config/vue-remote-server.js')
  return {
    name: 'card',
    components: {
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
        console.log(this.$refs.card)
        return `
        width: 100%;
        height: 0;
        padding-bottom: 65%;
        background-color: #eee;
        background-image: url(${VUE_SERVER}${this.content.img});
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        `
      }
    },

    watch: {
    },

    methods: {
      goDetail () {
        if (!this.content.id) {
          alert('no detail')
          return
        }
        this.$router.push({
          path: '/detail',
          query: { id: this.content.id }
        })
      }
    },

    mounted () {
    }

  }
}
