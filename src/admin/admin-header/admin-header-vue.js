exports.js = () => {
  return {
    name: 'admin-header',
    components: {
    },

    created () {
    },

    props: {
      show: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ''
      },
      btns: {
        type: Array,
        default: () => ['close']
      }
    },

    data () {
      return {
      }
    },

    computed: {
    },

    watch: {
    },

    methods: {
    },

    mounted () {
    }
  }
}
