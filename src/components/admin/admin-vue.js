exports.js = () => {
  return {
    name: 'admin',
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
      isLogin () {
        return this.username === '123'
      }
    },

    watch: {
    },

    methods: {
      test () {
        this.post('/user', {
          username: this.username
        }, (resp) => {
          console.log(resp)
        }, (err) => {
          console.log(err)
        })
        // console.log(this.username, this.password)
      }
    },

    mounted () {
      window.localStorage.setItem('adminUser', '11')
      window.localStorage.setItem('adminPwd', '21')
      console.log(window.localStorage.getItem('adminUser'))
      console.log(window.localStorage.adminPwd)
    }
  }
}
