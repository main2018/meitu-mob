exports.js = () => {
  const Card = require('base/card/card')
  const Tab = require('base/tab/tab')
  return {
    name: 'photo',
    components: {
      Card,
      Tab
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        photos: {}
      }
    },

    computed: {
    },

    watch: {
    },

    methods: {
    },

    mounted () {
      this.photos = this.$store.getters.photos
    }
  }
}
