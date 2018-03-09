exports.js = () => {
  const ImgUpload = require('base/img-upload/img-upload')
  return {
    name: 'category-editor',
    components: {
      ImgUpload
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        status: [],
        keyArr: ['order', 'icon', 'category', 'name']
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

    watch: {
    },

    methods: {
      close () {
        this.$emit('close')
      },
      edit (idx) {
        this.initStatus()
        this.status.splice(idx, 1, true)
      },
      cancel (idx) {
        this.resetVal(idx)
        this.status.splice(idx, 1, false)
      },
      check (idx) {
        let category = this.getVal(idx)
        category.oldCategory = this.categories[idx].category
        // console.log(this.getVal(idx))
        this.post('/category/update', category, (resp) => {
          if (resp.success) { this.$store.dispatch('getCategory') }
        })
        this.status.splice(idx, 1, false)
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
        this.categories.forEach(() => { this.status.push(false) })
      },
      resetVal (idx) {
        let trDom = this.$refs[idx][0]
        this.keyArr.forEach((item) => {
          let tdDom = trDom.getElementsByClassName(item)[0]
          tdDom.innerHTML = this.categories[idx][item] || '—'
        })
      },
      getVal (idx) {
        let trDom = this.$refs[idx][0]
        let val = {}
        this.keyArr.forEach((item) => {
          let tdDom = trDom.getElementsByClassName(item)[0]
          if (item === 'order') {
            val.order = parseInt(tdDom.innerHTML)
          } else {
            if (tdDom.innerHTML) { val[item] = tdDom.innerHTML }
          }
        })
        return val
      }
    },

    mounted () {
    }
  }
}
