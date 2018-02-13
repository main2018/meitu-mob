exports.js = () => {
  const Category = require('admin/category/category')
  return {
    name: 'aside-vue',
    components: {
      Category
    },

    data () {
      return {
        canEdit: false,
        newCategory: ''
      }
    },

    computed: {
      categories () {
        return this.$store.getters.categories
      },
      actives () {
        return this.$store.getters.categoryStatus
      }
    },

    methods: {

      delCategory (category, index) {
        let subcategories = this.categories[index].subcategories
        if (subcategories.length !== 0) {
          window.alert('please delete second and try angin')
          return
        }
        this.post('/category/del', { category }, (resp) => {
          if (!resp.success) { return }
          window.alert('delete success')
          this.$store.dispatch('getCategory')
        })
      },

      delSubcategory (category, subcategory) {
        this.post('/subcategory/del', {
          category, subcategory
        }, (resp) => {
          if (!resp.success) { return }
          window.alert('delete success')
          this.$store.dispatch('getCategory')
        })
      },

      updateEvent (currDom, key) {
        return this.updateCategory(currDom, key, this.categories, (urlPrefix, category, newCategory) => {
          this.canEdit = false
          if (!newCategory) {
            let txtDom = currDom.getElementsByClassName('text')[0]
            txtDom.innerHTML = category
            return
          }
          if (category === newCategory) { return }
          let url = urlPrefix === 'category' ? '/category' : '/subcategory'
          this.post(`${url}/update`, { category, newCategory }, (resp) => {
            if (resp.success) {
              this.$store.dispatch('getCategory')
            }
          })
        })
      },

      addBtn (key) {
        let currDom = this.$refs[key][0]
        let editEvent = this.editCategory(currDom, key)
        let editBtn = this.addDom(key, 'pencil', editEvent)
        let updateBtn = this.addDom(key + '_', 'check', this.updateEvent(currDom, key))
        currDom.append(editBtn)
        currDom.append(updateBtn)
      },

      delBtn (key) {
        let editDom = document.getElementById(key)
        let checkDom = document.getElementById(key + '_')
        let root = this.$refs[key][0]
        root.removeChild(editDom)
        root.removeChild(checkDom)
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
          this.canEdit = true
          let txtDom = dom.getElementsByClassName('text')[0]
          txtDom.setAttribute('contenteditable', true)
          txtDom.focus()
        }
      },

      updateCategory (dom, id, categories, callback) {
        return () => {
          let txtDom = dom.getElementsByClassName('text')[0]
          txtDom.setAttribute('contenteditable', false)

          let idxArr = id.split('_')
          let first = idxArr[0]
          let urlPrefix = 'category'
          let oldCategory = ''
          let newCategory = txtDom.innerHTML
          if (idxArr.length === 1) {
            oldCategory = categories[first].category
          } else if (idxArr.length === 2) {
            let second = idxArr[1]
            oldCategory = categories[first].subcategories[second]
            urlPrefix = 'subcategory'
          }
          callback(urlPrefix, oldCategory, newCategory)
        }
      },

      setActive (category, index, subIndex) {
        if (this.canEdit) { return }
        let order = { index }
        if (subIndex || subIndex === 0) {
          order.subIndex = subIndex
        }
        this.$store.dispatch('setStatus', order)
        this.emit(category)
      },

      enter (ev) {
        console.log(ev)
      },

      emit (category) {
        this.$emit('clicked', category)
      }
    },

    mounted () {
    }
  }
}
