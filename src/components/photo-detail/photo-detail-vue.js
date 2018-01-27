exports.js = () => {
  return {
    name: 'photo-detail',
    components: {
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        currItem: {}
      }
    },

    computed: {
      id () {
        return this.$route.query.id
      }
    },

    watch: {
    },

    methods: {
    },

    mounted () {
      console.log(this.id)
    }
  }
}
