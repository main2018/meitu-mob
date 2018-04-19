exports.js = () => {
  return {
    name: 'signin',
    components: {
    },

    props: {
      hasSignup: {
        type: Boolean,
        default: true
      }
    },

    data () {
      return {
        inUsername: '',
        inPassword: '',
        upUsername: '',
        upPassword: '',
        upConfirm: '',
        isSigninShow: true
      }
    },

    computed: {
      signBtnClass () {
        let pre = this.isSigninShow ? 'in' : 'up'
        let isActive = this[`${pre}Username`] && this[`${pre}Password`]
        return isActive ? 'active' : 'normal'
      }
    },

    methods: {
      signin () {
        if (!this.inUsername || !this.inPassword) { return }
        this.post('/user/signin', {
          username: this.inUsername,
          password: this.inPassword
        }, (resp) => {
          global.localStorage.setItem('account', this.inUsername)
          global.localStorage.setItem('token', resp.token)
          window.alert('success')
          this.$router.push('/admin')
        }, (err) => {
          this.log(err)
        })
      },
      signup () {
        if (!this.upUsername || !this.upPassword) { return }
        this.post('/user/signup', {
          username: this.upUsername,
          password: this.upPassword
        }, (resp) => {
          window.alert(resp)
        }, (err) => {
          this.log(err)
        })
      },
      showSignin () {
        this.isSigninShow = true
      },
      showSignup () {
        this.isSigninShow = false
      }
    }
  }
}
