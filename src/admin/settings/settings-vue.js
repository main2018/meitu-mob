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
        showBtn: true,
        siteName: ''
      }
    },

    computed: {
      name () { return this.$store.getters.name },
      images () { return [`${this.$store.getters.logo}`] }
    },

    watch: {
    },

    methods: {
      getFiles (event) {
        // this.showBtn = false
        let files = event.target.files[0]
        this.formData.set('logo', files)
      },
      close () { this.$emit('close') },
      submit () {
        this.formData.set('name', this.siteName || this.name)
        this.post('/setSettings', this.formData, (resp) => {
          if (resp.success) {
            this.$store.dispatch('getSettings')
          }
        })
      }
    },

    mounted () {
    }
  }
}
