exports.js = () => {
  const ImgUpload = require('base/img-upload/img-upload')
  return {
    name: 'settings',
    components: {
      ImgUpload
    },

    created () {
      this.formData = new FormData()
    },

    props: {
    },

    data () {
      return {
        siteName: ''
      }
    },

    computed: {
      name () { return this.$store.getters.settings.name },
      images () { return [`${this.$store.getters.settings.logo}`] }
    },

    watch: {
    },

    methods: {
      getFiles (event) {
        let files = event.target.files[0]
        this.formData.set('logo', files)
      },
      close () { this.$emit('close') },
      submit () {
        this.formData.set('name', this.siteName || this.name)
        this.post('/site/set', this.formData, (resp) => {
          if (resp.success) {
            this.$store.dispatch('getSettings')
            this.close()
          }
        })
      }
    },

    mounted () {
    }
  }
}
