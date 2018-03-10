exports.js = () => {
  // const { json2dom } = require('common/js/json2dom')
  const { customform } = require('./form')
  return {
    name: 'publish',
    components: {
      customform
    },

    props: {
      crumb: {
        type: Array,
        default: () => []
      }
    },

    data () {
      return {
      }
    },

    computed: {
      breadcrumb () {
        if (this.crumb.length === 0) { return '' }
        return this.crumb.reduce((pre, nxt) => {
          return `${pre} / ${nxt}`
        })
      }
    },

    methods: {
      getPostJson () {

      },
      test () {
        console.log(this.postJson)
      }
    },

    mounted () {
    }
  }
}
