exports.js = () => {
  const Category = require('admin/category/category')
  return {
    name: 'aside-vue',
    components: {
      Category
    },

    data () {
      return {
        isEditable: false,
        newCategory: '',
        categories: []
      }
    },

    methods: {
      getCategory () {
        this.get('/category/findAll', (resp) => {
          if (resp.success) {
            this.categories = resp.data
          }
        })
      },
      delCategory (category, index) {
        let subcategories = this.categories[index].subcategories
        if (subcategories.length !== 0) {
          window.alert('please delete second and try angin')
          return
        }
        this.post('/category/del', {
          category
        }, (resp) => {
          if (!resp.success) { return }
          window.alert('delete success')
          this.getCategory()
        })
      },
      delSubcategory (category, subcategory) {
        this.post('/subcategory/del', {
          category, subcategory
        }, (resp) => {
          if (!resp.success) { return }
          window.alert('delete success')
          this.getCategory()
        })
      },

      addBtn (key) {
        let currentDom = this.$refs[key][0]
        let editEvent = this.editCategory(currentDom, key)
        let editBtn = this.addDom(key, 'pencil', editEvent)
        let updateEvent = this.updateCategory(currentDom, key, this.categories, (urlPrefix, category, newCategory) => {
          if (category === newCategory) { return }
          let url = urlPrefix === 'category' ? '/category' : '/subcategory'
          this.post(`${url}/update`, { category, newCategory }, (resp) => {
            if (resp.success) { this.getCategory() }
          })
        })
        let updateBtn = this.addDom(key + '_', 'check', updateEvent)
        currentDom.append(editBtn)
        currentDom.append(updateBtn)
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
        return function () {
          let txtDom = dom.firstChild
          txtDom.setAttribute('contenteditable', true)
          txtDom.focus()
        }
      },

      updateCategory (dom, id, categories, callback) {
        return function () {
          let txtDom = dom.firstChild
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

      emit (category) {
        this.$emit('clicked', category)
      }
    },

    mounted () {
      this.getCategory()
    }
  }
}
