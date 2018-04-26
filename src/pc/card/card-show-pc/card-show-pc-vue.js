exports.js = () => {
  const { timeFormat } = require('common/js')
  const { getBgStyle } = require('common/js')
  return {
    name: 'card-show-pc',
    components: {
    },

    created () {
    },

    props: {
      content: {
      }
    },

    data () {
      return {
      }
    },

    computed: {
      activeNav () {
        return this.$store.getters.subNavActive
      }
    },

    watch: {
    },

    methods: {
      getBgStyle,
      timeFormat,
      goDetail () {
        console.log('go')
      }
    },

    mounted () {
      console.log(this.activeNav)
    }
  }
}
