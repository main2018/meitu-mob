exports.js = () => {
  const { VUE_SERVER } = require('config/vue-remote-server.js')
  const ImgUpload = require('base/img-upload/img-upload')
  return {
    name: 'category-editor',
    components: {
      ImgUpload
    },

    created () {
      this.formData = new FormData()
    },

    data () {
      return {
        http: VUE_SERVER,
        showBtn: true,
        imgStyle: '',
        status: [],
        iconShowStatus: [],
        activeIdx: 0,
        activeOldIcon: '',
        keyArr: ['order', 'category', 'name']
      }
    },

    computed: {
      categories () { return this.$store.getters.categories },
      canDel () {
        let canDel = []
        this.$store.getters.categories.forEach(category => {
          let length = category.subcategories.length
          canDel.push(!length)
        })
        return canDel
      }
    },

    methods: {
      close () { this.$emit('close') },
      edit (idx) {
        this.activeIdx = idx
        this.activeOldIcon = this.categories[idx].icon
        this.imgStyle = 'cursor: pointer'
        this.initStatus()
        this.status.splice(idx, 1, true)
      },
      cancel (idx) {
        this.imgStyle = ''
        this.resetVal(idx)
        this.status.splice(idx, 1, false)
        this.iconShowStatus.splice(this.activeIdx, 1, false)
        this.categories[this.activeIdx].icon = this.activeOldIcon
      },
      check (idx) {
        this.setFormData(idx)
        this.formData.set('oldCategory', this.categories[idx].category)
        this.post('/category/update', this.formData, (resp) => {
          if (resp.success) { this.$store.dispatch('getCategory') }
        })
        this.formData = new FormData()
        this.imgStyle = ''
        this.status.splice(idx, 1, false)
        this.iconShowStatus.splice(this.activeIdx, 1, false)
      },
      del (idx) {
        this.post('/category/del', {
          category: this.categories[idx].category
        }, (resp) => {
          if (!resp.success) { return }
          window.alert('delete success')
          this.$store.dispatch('getCategory')
        })
      },

      initStatus () {
        this.status = []
        this.iconShowStatus = []
        this.categories.forEach(() => {
          this.status.push(false)
          this.iconShowStatus.push(false)
        })
      },
      resetVal (idx) {
        let liDom = this.$refs[idx][0]
        this.keyArr.forEach((item) => {
          let tdDom = liDom.getElementsByClassName(item)[0]
          tdDom.innerHTML = this.categories[idx][item] || ''
        })
      },
      setFormData (idx) {
        let liDom = this.$refs[idx][0]
        this.keyArr.forEach((key) => {
          let html = liDom.getElementsByClassName(key)[0].innerHTML
          if (!html) { return }
          let val = key === 'order' ? parseInt(html) : html
          this.formData.set(key, val)
        })
        this.formData.set('hasArticle', this.categories[idx].hasArticle)
        this.formData.set('hasVideo', this.categories[idx].hasVideo)
        this.formData.set('hasLink', this.categories[idx].hasLink)
      },
      setPreview (imgs) {
        this.categories[this.activeIdx].icon = imgs[0]
      },
      getFiles (event) {
        this.showBtn = false
        let files = event.target.files[0]
        this.formData.set('icon', files)
        this.iconShowStatus.splice(this.activeIdx, 1, true)
      },
      updateImg (idx) {
        if (!this.status[idx]) { return }
        this.$refs.upload[idx].dispatch()
      }
    },

    mounted () {
    }
  }
}
