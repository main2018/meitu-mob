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
        }, resp => {
          this.setLocal('account', this.inUsername)
          this.setLocal('token', resp.token)
          this.$emit('succ')
          this.$router.push('/admin')
        }, err => { console.log(err) })
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
