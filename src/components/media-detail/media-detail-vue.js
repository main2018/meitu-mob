exports.js = () => {
  return {
    name: 'media-detail',
    components: {
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        url: 'https://mp.weixin.qq.com/s/ld-DuYisl9Ijz2O4qIEVzw'
      }
    },

    computed: {
      setData () {
        setTimeout(() => {
          let iframe = this.$refs.iframe
          console.log(iframe)
        }, 80)
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
