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
        }, ({token, expire}) => {
          const account = this.inUsername
          const user = {account, token, expire}
          this.setLocal('account', account)
          this.setLocal('token', token)
          this.$store.dispatch('setUser', user)
          this.$emit('succ')
          this.$router.push('/admin')
        }, err => { alert(err) })
      },
      signup () {
        if (!this.upUsername || !this.upPassword) { return }
        this.post('/user/signup', {
          username: this.upUsername,
          password: this.upPassword
        }, resp => {
          window.alert(resp)
        }, err => {
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
