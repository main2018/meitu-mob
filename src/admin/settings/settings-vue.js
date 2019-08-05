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
        isDialogShow: false,
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
      showSubmit () { return this.isLogoChanged || this.isNameChanged },
      dialogDisabled () { return !this.oldPassword || !this.newPassword }
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
        }, (resp, msg) => {
          this.$store.dispatch('getSettings')
          this.isLogoChanged = false
          alert(msg)
          this.close()
        })
      },
      signout () {
        this.$store.dispatch('setUser', {
          account: '',
          token: '',
          epxpire: 0
        })
        this.$router.push('/admin/signin')
      },

      dialogOpen () { this.isDialogShow = true },
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
