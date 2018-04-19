exports.js = () => {
  const Signin = require('base/signin/signin')
  const Category = require('admin/category/category')
  return {
    name: 'aside-vue',
    components: { Category, Signin },

    data () {
      return {
        canEdit: false,
        newSubcategory: ''
      }
    },

    computed: {
      categories () { return this.$store.getters.categories },
      actives () { return this.$store.getters.categoryStatus }
    },

    methods: {
      delSubcategory (category, subcategory) {
        this.post('/subcategory/del', {
          category, subcategory
        }, () => {
          window.alert('delete success')
          this.$store.dispatch('getCategory')
        })
      },

      updateEvent (dom, key) {
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
          this.post(`/subcategory/updateName`, {
            subcategory, newSubcategory
          }, () => {
            this.$store.dispatch('getCategory')
          })
        })
      },

      bundleBtn (key) {
        let currDom = this.$refs[key][0]
        let isSubcategoryKey = key.indexOf('_') > -1
        let method = isSubcategoryKey ? 'editSubcategory' : 'editCategory'

        let editEvent = this[method](currDom, key)
        let editBtn = this.addDom(key, 'pencil', editEvent)

        // let addSubEvent = this.addSubcategory(currDom, key)
        // let addSubBtn = this.addDom(key + '1', 'plus', addSubEvent)

        let updateEvent = this.updateEvent(currDom, key)
        let updateBtn = this.addDom(key + '_', 'check', updateEvent)

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

      addSubcategory (dom, id) {
        return () => {
          console.log(+id)
        }
      },

      updateSubcategory (dom, id, categories, callback) {
        return () => {
          let txtDom = dom.getElementsByClassName('text')[0]
          txtDom.setAttribute('contenteditable', false)

          let idxArr = id.split('_')
          let first = idxArr[0]
          let second = idxArr[1]
          let subcategory = categories[first].subcategories[second]
          let newSubcategory = txtDom.innerHTML
          callback({ subcategory, newSubcategory })
        }
      },

      setActive (category, index, subIndex) {
        if (this.canEdit) { return }
        let order = { index }
        if (subIndex || subIndex === 0) {
          order.subIndex = subIndex
        }
        this.$store.dispatch('setStatus', order)
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

/*
delCategory (category, index) {
  let subcategories = this.categories[index].subcategories
  if (subcategories.length !== 0) {
    window.alert('please delete second and try angin')
    return
  }
  this.post('/category/delByCategory', { category }, () => {
    window.alert('delete success')
    this.$store.dispatch('getCategory')
  })
},
*/
