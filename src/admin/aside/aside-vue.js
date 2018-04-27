exports.js = () => {
  const Category = require('admin/category/category')
  return {
    name: 'aside-vue',
    components: { Category },

    data () {
      return {
        isAddSubcategory: false,
        canEdit: false,
        newSubcategory: ''
      }
    },

    computed: {
      categories () { return this.$store.getters.categories },
      actives () { return this.$store.getters.categoryStatus }
    },

    methods: {
      delCategory (category) {
        this.post('/subcategory/del', { category }, () => {
          window.alert('delete success')
          this.$store.dispatch('getCategory')
        })
      },
      delSubcategory (idx, category, subcategory) {
        if (this.isAddSubcategory) {
          this.isAddSubcategory = false
          this.categories[idx].subcategories.shift()
          return
        }
        this.post('/subcategory/del', {
          category, subcategory
        }, () => {
          window.alert('delete success')
          this.$store.dispatch('getCategory')
        })
      },

      addOrUpdateEvent (dom, key) {
        let index = key.split('_')[0]
        let path = `/subCategory/updateName`

        return this.updateSubcategory(dom, key, this.categories, ({
          subcategory,
          newSubcategory
        }) => {
          this.canEdit = false
          if (subcategory === newSubcategory) { return }

          if (!newSubcategory) {
            let txtDom = dom.getElementsByClassName('text')[0]
            txtDom.innerHTML = subcategory
            return
          }

          let data = { subcategory, newSubcategory }
          if (this.isAddSubcategory) {
            path = `/subCategory/add`
            data = {
              category: this.categories[index].category,
              subcategory: newSubcategory
            }
          }

          this.post(path, data, () => {
            this.$store.dispatch('getCategory')
            window.location.reload()
            this.isAddSubcategory = false
          })
        })
      },

      bundleBtn (key) {
        let currDom = this.$refs[key][0]
        let isSubcategoryKey = key.indexOf('_') > -1
        let method = isSubcategoryKey ? 'editSubcategory' : 'editCategory'

        let editEvent = this[method](currDom, key)
        let editBtn = this.addDom(key, 'pencil', editEvent)

        let addOrUpdateEvent = this.addOrUpdateEvent(currDom, key)
        let updateBtn = this.addDom(key + '_', 'check', addOrUpdateEvent)

        // !isSubcategoryKey && currDom.appendChild(addSubBtn)
        isSubcategoryKey && currDom.appendChild(updateBtn)
        currDom.appendChild(editBtn)
      },

      delBtn (key) {
        let isSubcategoryKey = key.indexOf('_') > -1
        let editDom = document.getElementById(key)
        let checkDom = document.getElementById(key + '_')
        // let addSubDom = document.getElementById(key + '1')
        let root = this.$refs[key][0]
        root.removeChild(editDom)
        // !isSubcategoryKey && root.removeChild(addSubDom)
        isSubcategoryKey && root.removeChild(checkDom)
      },

      addDom (id, icon, event) {
        let btn = document.createElement('div')
        btn.setAttribute('id', id)
        btn.setAttribute('class', 'mdi mdi-' + icon)
        btn.style.width = '30px'
        btn.style.lineHeight = '1.9rem'
        btn.addEventListener('click', event)
        return btn
      },

      editCategory (dom, id) {
        return () => {
          this.$store.dispatch('showEditor', +id)
        }
      },

      editSubcategory (dom, id) {
        return () => {
          this.canEdit = true
          let txtDom = dom.getElementsByClassName('text')[0]
          txtDom.setAttribute('contenteditable', true)
          txtDom.focus()
        }
      },

      /**
       * todo: add subcategory
       */

      addSubcategory (idx) {
        this.isAddSubcategory = true
        this.categories[idx].subcategories.unshift('')

        this.canEdit = true
        this.$nextTick(() => {
          let currDom = this.$refs[`${idx}_0`][0]
          let txtDom = currDom.getElementsByClassName('text')[0]
          txtDom.setAttribute('contenteditable', true)
          txtDom.focus()
        })
      },

      updateSubcategory (dom, id, categories, callback) {
        return () => {
          let txtDom = dom.getElementsByClassName('text')[0]
          txtDom.setAttribute('contenteditable', false)
          let newSubcategory = txtDom.innerHTML
          txtDom.innerHTML = ''

          let idxArr = id.split('_')
          let first = idxArr[0]
          let second = idxArr[1]
          let subcategory = categories[first].subcategories[second]
          callback({ subcategory, newSubcategory })
        }
      },

      setActive (category, index, subIndex) {
        if (this.canEdit) { return }
        let order = { index }
        if (subIndex || subIndex === 0) {
          order.subIndex = subIndex
        }
        this.$store.dispatch('setAdminNavStatus', order)
        this.$store.dispatch('setActiveCategory', category)
        this.$store.dispatch('getAdminAlbums', {
          category: category[0],
          subcategory: category[1]
        })
        this.emit(category)
      },

      enterKey (ev) { console.log(ev) },

      emit (category) { this.$emit('clicked', category) }
    },

    mounted () {
    }
  }
}
