exports.js = () => {
  const { qiniuUpload } = require('common/js/qiniu-upload.js')
  const { QINIU_URL_PREFIX } = require('config')
  const ImgUpload = require('base/img-upload/img-upload')
  const AdminHeader = require('admin/admin-header/admin-header')
  return {
    name: 'category-editor',
    components: {
      ImgUpload,
      AdminHeader
    },

    created () {
      this.formData = new FormData()
      this.postJson = {}
    },

    data () {
      return {
        http: QINIU_URL_PREFIX,
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
        this.file = {}
        this.resetVal(idx)
        this.status.splice(idx, 1, false)
        this.iconShowStatus.splice(this.activeIdx, 1, false)
        this.categories[this.activeIdx].icon = this.activeOldIcon
      },
      check (idx) {
        console.log('in')
        qiniuUpload(this.file, (fname) => {
          this.getPostJson(idx)
          this.postJson.icon = fname
          console.log({ fname })

          this.post('/category/update', this.postJson, (resp) => {
            if (resp.success) { this.$store.dispatch('getCategory') }
          })
          this.postJson = {}
          this.imgStyle = ''
          this.status.splice(idx, 1, false)
          this.iconShowStatus.splice(this.activeIdx, 1, false)
        })
      },
      del (idx) {
        this.post('/category/delByCategory', {
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
      getPostJson (idx) {
        let liDom = this.$refs[idx][0]
        this.keyArr.forEach((key) => {
          let html = liDom.getElementsByClassName(key)[0].innerHTML
          if (!html) { return }
          let val = key === 'order' ? parseInt(html) : html
          this.postJson[key] = val
        })
        this.postJson.hasArticle = this.categories[idx].hasArticle
        this.postJson.hasVideo = this.categories[idx].hasVideo
        this.postJson.hasLink = this.categories[idx].hasLink
        this.postJson._id = this.categories[idx]._id
      },
      setPreview (imgs) {
        this.categories[this.activeIdx].icon = imgs[0]
      },
      getFiles (event) {
        this.showBtn = false
        this.file = event.target.files[0]
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
