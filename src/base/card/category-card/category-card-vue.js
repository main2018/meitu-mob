exports.js = () => {
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
        let icon = this.content.icon
        let url = icon ? this.$qiniuUrl(icon) : ''
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
