exports.js = () => {
  const { qiniuDel } = require('common/js/qiniu-api.js')
  const AdminHeader = require('admin/admin-header/admin-header')
  const FileUpload = require('base/file-upload/file-upload')
  return {
    name: 'settings',
    components: { AdminHeader, FileUpload },

    created () {
    },

    props: { },

    data () {
      return {
        isLogoChanged: false,
        siteName: '',
        logo: '',
        oldPassword: '',
        newPassword: ''
      }
    },

    computed: {
      name () { return this.$store.getters.settings.name },
      isNameChanged () { return this.siteName && this.siteName !== this.name },
      showSubmit () { return this.isLogoChanged || this.isNameChanged }
    },

    watch: { },

    methods: {
      getFiles (fname) {
        this.isLogoChanged = true
        this.logo = fname
      },
      getLogo () { this.logo = this.getLocal('siteLogo') },
      close () {
        if (this.isLogoChanged) {
          qiniuDel(this.logo)
          this.getLogo()
        }
        this.$emit('close')
      },
      submit () {
        this.post('/site/set', {
          name: this.siteName || this.name,
          logo: this.logo
        }, () => {
          this.$store.dispatch('getSettings')
          this.isLogoChanged = false
          this.close()
        })
      },
      signout () {
        this.delLocal('account')
        this.delLocal('token')
        this.$router.push('/admin/signin')
      }
    },

    mounted () {
      this.getLogo()
    }
  }
}
