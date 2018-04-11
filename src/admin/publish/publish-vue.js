exports.js = () => {
  const AdminHeader = require('admin/admin-header/admin-header')
  return {
    name: 'publish',
    components: {
      AdminHeader
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
