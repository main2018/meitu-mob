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
        post: [{
          field: 'coverimg',
          type: 'file',
          value: ''
        }, {
          field: 'title',
          type: 'text',
          placeholder: 'title'
        }, {
          field: 'text',
          type: 'textarea'
        }, {
          field: 'year',
          type: 'range',
          min: 1,
          max: 100,
          step: 1
        }, {
          type: 'button',
          value: 'submit',
          event: {
            click: () => this.test()
          }
        }]
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
