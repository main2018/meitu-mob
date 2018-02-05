exports.js = () => {
  return {
    name: 'aside-vue',
    components: {
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        category: '',
        newCategory: '',
        subcategory: '',
        currCategory: {},
        categories: [],
        subcategories: []
      }
    },

    computed: {
    },

    watch: {
    },

    methods: {
      getCategory () {
        this.get('/category/findAll', (resp) => {
          if (!resp.success) { return }
          resp.data.forEach((item) => {
            item.first = false
            item.second = []
            item.subcategories.forEach((subItem) => {
              item.second.push(false)
            })
          })
          this.categories = resp.data
          this.currCategory = this.categories[0].category
        })
      },
      addCategory () {
        if (!this.category) { return }
        this.post('/category/add', {
          category: this.category
        }, (resp) => {
          if (!resp.success) { return }
          window.alert('publish success')
          this.category = ''
          this.getCategory()
        })
      },
      updateCategory (index) {
        this.toggleEditable(index)
        this.post('/category/update', {
          category: this.categories[index].category,
          newCategory: this.newCategory
        }, (resp) => {
          if (!resp.success) { return }
          this.getCategory()
          window.alert('update success')
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
      addSubcategory () {
        this.post('/subcategory/add', {
          category: this.currCategory,
          subcategory: this.subcategory
        }, (resp) => {
          if (!resp.success) { return }
          window.alert('publish success')
          this.subcategory = ''
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
      toggleEditable (index, inputModel = false) {
        this.categories[index].first = !this.categories[index].first
        if (inputModel) { this.newCategory = inputModel }
      },
      emit (category) {
        // console.log(category)
      }
    },

    mounted () {
      this.getCategory()
    }
  }
}
