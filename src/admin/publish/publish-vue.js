exports.js = () => {
  return {
    name: 'publish',
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
      breadcrumb () { return this.$store.getters.categoryCrumb }
    },

    watch: {
    },

    methods: {
      closePublish () { this.$emit('close') }
    },

    mounted () {
    }
  }
}
