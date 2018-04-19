exports.js = () => {
  return {
    name: 'signin',
    components: {
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        username: '',
        password: ''
      }
    },

    computed: {
    },

    watch: {
    },

    methods: {
      signin () {
        let { username, password } = this
        this.post('/user/signin', {
          username, password
        }, resp => {
          console.log(resp)
        }, err => {
          console.log(err)
        })
      },
      signup () {
        let { username, password } = this
        this.post('/user/signup', {
          username, password
        }, resp => {
          console.log(resp)
        }, err => {
          console.log(err)
        })
      },
      signout () {
        let { username, password } = this
        this.post('/user/signout', { username, password }, resp => {
          console.log(resp)
        })
      }
    },

    mounted () {
    }
  }
}
