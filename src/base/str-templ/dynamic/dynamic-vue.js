exports.js = () => {
  return {
    name: 'dynamic',
    components: {
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
      path () {
        return this.$route.path
      }
    },

    watch: {
    },

    methods: {
    },

    mounted () {
      console.log(this.path)
    }
  }
}
