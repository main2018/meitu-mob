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
      emit (category) {
        // console.log(category)
      }
    },

    mounted () {
      this.getCategory()
    }
  }
}
