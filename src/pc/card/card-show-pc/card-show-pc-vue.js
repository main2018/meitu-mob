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
        let { id } = this.content
        this.$store.dispatch('getCurrAlbum', id)
        if (!this.content.id) { return alert('no detail') }
        this.$router.push({ path: `/detail`, query: { id } })
      }
    },

    mounted () {
      console.log(this.activeNav)
    }
  }
}
