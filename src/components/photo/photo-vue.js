exports.js = () => {
  const Card = require('base/card/card')
  return {
    name: 'photo',
    components: {
      Card
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
