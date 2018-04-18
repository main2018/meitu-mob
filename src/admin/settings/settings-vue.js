exports.js = () => {
  const AdminHeader = require('admin/admin-header/admin-header')
  const FileUpload = require('base/file-upload/file-upload')
  return {
    name: 'settings',
    components: { AdminHeader, FileUpload },

    created () { },

    props: { },

    data () {
      return {
        siteName: '',
        logo: ''
      }
    },

    computed: {
      name () { return this.$store.getters.settings.name }
    },

    watch: { },

    methods: {
      getFiles (fname) { this.logo = fname },
      getLogo () { this.logo = this.getLocal('siteLogo') },
      close () { this.$emit('close') },
      submit () {
        this.post('/site/set', {
          name: this.siteName || this.name,
          logo: this.logo
        }, resp => {
          if (!resp.success) { return }
          this.$store.dispatch('getSettings')
          this.close()
        })
      }
    },

    mounted () {
      this.getLogo()
    }
  }
}
