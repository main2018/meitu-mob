exports.js = () => {
  const { qiniuDel } = require('common/js/qiniu-api.js')
  const AdminHeader = require('admin/admin-header/admin-header')
  const FileUpload = require('base/file-upload/file-upload')
  const AdminDialog = require('base/dialog/dialog')
  return {
    name: 'settings',
    components: { AdminHeader, FileUpload, AdminDialog },

    created () {
    },

    props: { },

    data () {
      return {
        isDialogShow: true,
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
      siteUpdate () {
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
      },

      dialogClose () { this.isDialogShow = false },
      dialogUpdate () {
        let { oldPassword, newPassword } = this
        this.post('/user/update', {
          oldPassword, newPassword
        }, (data, msg) => {
          this.dialogClose()
          alert(msg)
        }, msg => { alert(msg) })
      }
    },

    mounted () {
      this.getLogo()
    }
  }
}
